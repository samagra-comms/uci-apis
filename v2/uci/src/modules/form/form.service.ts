import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from 'src/global-services/telemetry.service';
import fetch from 'node-fetch';
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
import { FormUploadStatus } from './form.types';

@Injectable()
export class FormService {
  odkClient: any;
  ODK_FILTER_URL: string;
  ODK_FORM_UPLOAD_URL: string;
  TRANSFORMER_BASE_URL: string;
  errCode =
    ProgramMessages.EXCEPTION_CODE + '_' + ODKMessages.UPLOAD.EXCEPTION_CODE;
  formFile: Express.Multer.File;

  constructor(
    private configService: ConfigService,
    private telemetryService: TelemetryService,
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
    this.login(); //first time login
  }

  async login() {
    this.odkClient.request(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      null,
      this,
    );
  }

  async uploadForm(formFile: Express.Multer.File): Promise<FormUploadStatus> {
    this.formFile = formFile;
    return this.odkClient.request(
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
              await fetch(this.extras.TRANSFORMER_BASE_URL)
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
                const checkPoint = 'CP-1';
                return {
                  status: 'ERROR',
                  errorCode:
                    ODKMessages.UPLOAD.EXCEPTION_CODE + '-' + checkPoint,
                  errorMessage: ODKMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
                  data: {},
                };
              }
            } else {
              const checkPoint = 'CP-2';
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
            const checkPoint = 'CP-3';
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
        const checkPoint = 'CP-4';
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
}
