import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { Secret } from './types';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretService: SecretsService) {}

  @Post()
  create(
    @Body() secretBody: Secret,
    @Body() type: string,
    @Body() variableName: string,
    @Body() ownerId: string,
  ) {
    // TODO: verify type of the secret => this.type === this.secretBody.type
    return this.secretService.setSecret(
      ownerId + '/' + variableName,
      secretBody,
    );
  }

  @Get(':variableName')
  findOne(@Param('variableName') id: string, @Body() ownerId: string) {
    return this.secretService.getSecretByPath(ownerId + '/' + id);
  }

  @Get('all')
  findAll(@Body() ownerId: string) {
    return this.secretService.getSecretByPath(ownerId);
  }
}
