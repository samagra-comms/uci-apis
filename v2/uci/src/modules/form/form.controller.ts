import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';
import { FormService } from './form.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const editFileName = (req: Request, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const formFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(xml|jpg|jpeg|png|gif|mp4|mov|avi|mvi|mkv|flv|webm|pdf)$/)) {
    return callback(new BadRequestException('Media format is unsupported!'), false);
  }
  callback(null, true);
};
import { AddAdminHeaderInterceptor } from '../../interceptors/addAdminHeader.interceptor';
import { AddOwnerInfoInterceptor } from '../../interceptors/addOwnerInfo.interceptor';
import { AddResponseObjectInterceptor } from '../../interceptors/addResponseObject.interceptor';
import { AddROToResponseInterceptor } from '../../interceptors/addROToResponse.interceptor';
import { FastifyFileFieldInterceptor } from '../../interceptors/multipleFields.interceptor';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(
    FastifyFileFieldInterceptor([
      {name: 'form', maxCount: 1},
      {name: 'mediaFiles'}
    ], {
      storage: diskStorage({
        destination: './upload/single',
      }),
      fileFilter: formFileFilter
    }),
    AddResponseObjectInterceptor, //sequencing matters here
    AddAdminHeaderInterceptor,
    AddOwnerInfoInterceptor,
    AddROToResponseInterceptor,
  )
  async single(
    @UploadedFiles() files: {form: Express.Multer.File[], mediaFiles: Express.Multer.File[]},
  ) {
    const response = await this.formService.uploadForm(files.form[0], files.mediaFiles);
    fs.unlink(files.form[0].path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    files.mediaFiles.forEach((formFile) => {
      fs.unlink(formFile.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    return response;
  }
}
