import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import fetchMock from 'fetch-mock';
import { ConfigService } from '@nestjs/config';
import stream from 'stream';
import fs from 'fs';
import { ServiceUnavailableException } from '@nestjs/common';

const mockXmlFile: Express.Multer.File = {
  fieldname: 'testFieldXML',
  originalname: 'testing_form_copy.xml',
  encoding: '7bit',
  mimetype: 'text/xml',
  size: 100,
  destination: './raw',
  filename: 'testing_form_copy.xml',
  path: 'src/modules/form/raw/testing_form_copy.xml',
  buffer: Buffer.from('test data'),
  stream: new stream.Readable({
    read() {
      this.push('Data');
      this.push(null);
    }
  })
};

const mockMediaFiles: Express.Multer.File[] = [
  {
    fieldname: 'testFieldImage1',
    originalname: 'testImage1.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 100,
    destination: '/tmp',
    filename: 'testImage1.jpeg',
    path: '/tmp/testImage1.jpeg',
    buffer: Buffer.from('test data'),
    stream: new stream.Readable({
      read() {
        this.push('Data');
        this.push(null);
      }
    })
  },
];

class mockConfigService {
  get(envString: string): string {
    switch (envString) {
      case 'MINIO_MEDIA_UPLOAD_URL': return 'http://minio_upload_url';
      case 'ODK_BASE_URL': return 'http://odk_form_upload_url';
      case 'TRANSFORMER_BASE_URL': return 'http://transformer_base_url';
      default: return '';
    }
  }
}

jest.mock('../../common/digestAuthRequest', () => {
  return function digestAuthRequest(
    _method,
    _url,
    _username,
    _password,
    _options: { timeout?: number; loggingOn?: boolean } = {
      timeout: 10000,
      loggingOn: false,
    },
  ) {
    this.request = (successFn, _errorFn, _data, extras) => {
      return successFn.call({extras: extras}, {});
    }
  }
});

describe('FormService', () => {
  let formService: FormService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        ConfigService, {
          provide: ConfigService,
          useClass: mockConfigService,
        },
      ],
    }).compile();

    fs.copyFileSync('src/modules/form/raw/testing_form.xml', 'src/modules/form/raw/testing_form_copy.xml');
    
    formService = module.get<FormService>(FormService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    fs.unlinkSync('src/modules/form/raw/testing_form_copy.xml');
    fetchMock.restore();
  });

  it('form upload test', async () => {
    fetchMock.postOnce(`${configService.get('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testMediaFile.png'
    });
    fetchMock.postOnce(`${configService.get('ODK_BASE_URL')}/formUpload`,
      'Successful form upload.'
    );
    fetchMock.getOnce(`${configService.get('TRANSFORMER_BASE_URL')}`, '');

    const result = await formService.uploadForm(mockXmlFile, mockMediaFiles);
    expect(result).toEqual({
      status: 'UPLOADED',
      data: {
        formID: 'testing_form',
      },
    });

    const sentFileContent = fs.readFileSync('src/modules/form/raw/testing_form_copy.xml');
    const expectedFileContent = fs.readFileSync('src/modules/form/raw/expected_xml_media_upload.xml');
    expect(sentFileContent).toEqual(expectedFileContent);
  });

  it('form upload throws service unavailable exception when minio is unavailable', async () => {
    fetchMock.postOnce(`${configService.get('MINIO_MEDIA_UPLOAD_URL')}`, () => {
      throw new Error();
    });

    expect(formService.uploadForm(mockXmlFile, mockMediaFiles))
    .rejects
    .toThrowError(new ServiceUnavailableException('Media upload failed! Reason: Error'));
  });

  it('form upload throws service unavailable exception when ODK server is unavailable', async () => {
    fetchMock.postOnce(`${configService.get('MINIO_MEDIA_UPLOAD_URL')}`, {
      fileName: 'testMediaFile.png'
    });
    fetchMock.postOnce(`${configService.get('ODK_BASE_URL')}/formUpload`, () => {
      throw new Error();
    });

    expect(formService.uploadForm(mockXmlFile, mockMediaFiles))
    .rejects
    .toThrowError(new ServiceUnavailableException('Failed to upload form file!'));
  });
});
