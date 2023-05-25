import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import digestAuthRequest from '../../common/digestAuthRequest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormData = require('form-data');
import {
  ODK as ODKMessages,
  PROGRAM as ProgramMessages,
} from '../../common/messages';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
import parser from 'xml2json';
import { FormMediaUploadStatus, FormUploadStatus } from './form.types';

@Injectable()
export class FormService {
  odkClient: any;
  ODK_FILTER_URL: string;
  ODK_FORM_UPLOAD_URL: string;
  TRANSFORMER_BASE_URL: string;
  MINIO_MEDIA_UPLOAD_URL: string;
  errCode =
    ProgramMessages.EXCEPTION_CODE + '_' + ODKMessages.UPLOAD.EXCEPTION_CODE;
  formFile: Express.Multer.File;

  constructor(
    private configService: ConfigService,
  ) {
    this.ODK_FILTER_URL = `${this.configService.get<string>(
      'ODK_BASE_URL',
    )}/Aggregate.html#submissions/filter///`;
    this.ODK_FORM_UPLOAD_URL = `${this.configService.get<string>(
      'ODK_BASE_URL',
    )}/formUpload`;
    this.TRANSFORMER_BASE_URL = `${this.configService.get<string>(
      'TRANSFORMER_BASE_URL',
    )}`;
    this.MINIO_MEDIA_UPLOAD_URL = `${this.configService.get<string>(
      'MINIO_MEDIA_UPLOAD_URL'
    )}`

    this.odkClient = new digestAuthRequest(
      'GET',
      this.ODK_FILTER_URL,
      this.configService.get<string>('ODK_USERNAME'),
      this.configService.get<string>('ODK_PASSWORD'),
      {
        timeout: 5000,
        loggingOn: false,
      },
    );
    this.login().catch((err) => console.error(`Failed to login to ODK! Reason ${err}`)); //first time login
  }

  async login(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.odkClient.request(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {
          resolve('Logged in to ODK');
          console.log('Logged in to ODK');
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (err) => {
          reject(err);
          console.log('Error Logging in to ODK');
        },
        null,
        this,
      );
    });
  }

  async uploadForm(formFile: Express.Multer.File, mediaFiles: Express.Multer.File[]): Promise<FormUploadStatus> {
    await this.login();
    if (mediaFiles && mediaFiles.length > 0) {
      const mediaUploadResult = await this.uploadFormMediaFiles(mediaFiles);
      if (mediaUploadResult.error || !mediaUploadResult.data) {
        return {
          status: 'ERROR',
          errorCode: ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + 'CP-0',
          errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
          data: {},
        };
      }
      const xmlModificationError = this.replaceMediaFileName(formFile, mediaUploadResult.data);
      if (xmlModificationError != '') {
        return {
          status: 'ERROR',
          errorCode: ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + 'CP-1',
          errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
          data: {},
        };
      }
    }
    this.formFile = formFile;
    return await this.odkClient.request(
      async function (data): Promise<FormUploadStatus> {
        const formData = new FormData();
        const file = fs.createReadStream(formFile.path);
        formData.append('form_def_file', file, formFile.originalname);

        const requestOptions = {
          method: 'POST',
          headers: {
            Cookie: data.cookie,
          },
          body: formData,
        };

        const d: FormUploadStatus = await fetch(
          this.extras.ODK_FORM_UPLOAD_URL,
          requestOptions,
        )
          .then((response) => response.text())
          .then(async (result): Promise<FormUploadStatus> => {
            if (result.includes('Successful form upload.')) {
              fetch(this.extras.TRANSFORMER_BASE_URL)
                .then(console.log)
                .catch(console.log);
              const data = fs.readFileSync(formFile.path);
              try {
                const formDef = JSON.parse(parser.toJson(data.toString()));
                let formID = '';
                if (Array.isArray(formDef['h:html']['h:head'].model.instance)) {
                  formID =
                    formDef['h:html']['h:head'].model.instance[0].data.id;
                } else {
                  formID = formDef['h:html']['h:head'].model.instance.data.id;
                }
                return {
                  status: 'UPLOADED',
                  data: {
                    formID,
                  },
                };
              } catch (e) {
                const checkPoint = 'CP-2';
                return {
                  status: 'ERROR',
                  errorCode:
                    ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + checkPoint,
                  errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
                  data: {},
                };
              }
            } else {
              const checkPoint = 'CP-3';
              return {
                status: 'ERROR',
                errorCode: ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + checkPoint,
                errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
                data: {},
              };
            }
          })
          .catch((error) => {
            console.log({ error });
            const checkPoint = 'CP-4';
            return {
              status: 'ERROR',
              errorCode: ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + checkPoint,
              errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
              data: {},
            };
          });
        return d;
      },
      function (errorCode): FormUploadStatus {
        console.log({ errorCode });
        const checkPoint = 'CP-5';
        return {
          status: 'ERROR',
          errorCode: ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + checkPoint,
          errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
          data: {},
        };
      },
      null,
      this,
    );
  }

  async uploadFormMediaFiles(mediaFiles: Express.Multer.File[]): Promise<FormMediaUploadStatus> {
    const promises: any = [];

    mediaFiles.forEach((mediaFile: Express.Multer.File) => {
      const formData = new FormData();
      const fileToUpload = fs.createReadStream(mediaFile.path);
      formData.append('file', fileToUpload, mediaFile.originalname);

      const requestOptions = {
        method: 'POST',
        body: formData,
        timeout: 10000,
      };

      const promise = fetch(
        this.MINIO_MEDIA_UPLOAD_URL,
        requestOptions
      )
      .then((response) => response.json());

      promises.push(promise);
    });

    const uploadedMediaNames: Map<string, string> = new Map();
    const resultStatus: FormMediaUploadStatus = {
      status: 'PENDING'
    };

    return Promise.all(promises)
    .then((results) => {
      for (let i = 0; i < mediaFiles.length; i++) {
        if (results[i].error == null) {
          uploadedMediaNames.set(
            mediaFiles[i].originalname,
            results[i].fileName
          );
        }
        else {
          console.log(results[i].error);
          resultStatus.error = results[i].error;
          resultStatus.errorCode = results[i].status;
          return resultStatus;
        }
      }

      resultStatus.status = 'UPLOADED';
      resultStatus.data = uploadedMediaNames;
      return resultStatus;
    })
    .catch((error) => {
      console.log(error);
      resultStatus.error = error;
      resultStatus.errorCode = 500;
      return resultStatus;
    });
  }

  replaceMediaFileName(formFile: Express.Multer.File, uploadedMediaNames: Map<string, string>): string {
    try {
      let data = fs.readFileSync(formFile.path, 'utf-8');
      uploadedMediaNames.forEach((value: string, key: string) => {
        data = data.replaceAll(`{${key}}`, this.getReplacementStringForFileType(value));
      });
      fs.writeFileSync(formFile.path, data);
      return '';
    } catch (err) {
      return err;
    }
  }

  getReplacementStringForFileType(mediaFileName: string): string {
    const imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const videoFileExtensions = ['.mp4', '.mov', '.wmv', '.avi', '.mkv', '.flv', '.webm'];
    const documentFileExtensions = ['.pdf'];
    const extension: string = mediaFileName.substring(mediaFileName.lastIndexOf('.'));
    if (imageFileExtensions.includes(extension)) {
      return `<text id="/data/tunnel/display_cdn_image:label"><value>${mediaFileName}</value><value form="image">jr://images/yes</value></text>`;
    }
    else if (videoFileExtensions.includes(extension)) {
      return `<text id="/data/tunnel/display_cdn_video:label"><value>${mediaFileName}</value><value form="image">jr://images/yes</value></text>`;
    }
    else if (documentFileExtensions.includes(extension)) {
      return `<text id="/data/tunnel/display_cdn_document:label"><value>${mediaFileName}</value><value form="image">jr://images/yes</value></text>`;
    }
    else {
      console.log("Unsupported File!");
      return '';
    }
  }
}
