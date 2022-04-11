import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AddAdminHeaderInterceptor } from 'src/interceptors/addAdminHeader.interceptor';
import { AddOwnerInfoInterceptor } from 'src/interceptors/addOwnerInfo.interceptor';
import { AddResponseObjectInterceptor } from 'src/interceptors/addResponseObject.interceptor';
import { AddROToResponseInterceptor } from 'src/interceptors/addROtoResponse.interceptor';
import { SecretDTO } from './secret.dto';
import { SecretsService } from './secrets.service';
import { getSecretType } from './types';

@UseInterceptors(
  AddResponseObjectInterceptor,
  AddAdminHeaderInterceptor,
  AddOwnerInfoInterceptor,
  AddROToResponseInterceptor,
)
@Controller('secret')
export class SecretsController {
  constructor(private readonly secretService: SecretsService) {}

  @Post()
  async create(@Body() secretDTO: SecretDTO): Promise<any> {
    console.log({ secretDTO });
    if (secretDTO.type === getSecretType(secretDTO.secretBody)) {
      await this.secretService.setSecret(
        secretDTO.ownerId + '/' + secretDTO.variableName,
        secretDTO.secretBody,
      );
    } else {
      throw new Error(
        'Type of the secret is not correct ' +
          getSecretType(secretDTO.secretBody) +
          ' detected',
      );
    }
  }

  @Get(':variableName')
  async findOne(
    @Param('variableName') variableName: string,
    @Body() ownerId: string,
  ): Promise<any> {
    return this.secretService.getSecretByPath(ownerId + '/' + variableName);
  }

  @Get('all')
  async findAll(@Body() ownerId: string): Promise<any> {
    return this.secretService.getSecretByPath(ownerId);
  }
}
