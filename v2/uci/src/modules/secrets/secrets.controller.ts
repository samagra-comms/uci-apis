import { Body, Controller, Post } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { Secret } from './types';

@Controller('secrets')
export class SecretsController {
  // Add a new secret to a userPath. The keys will be stored by ownerID.
  // Secrets are stored based on spec.
  // Examples:
  //   - user1/UserSegmentServer1
  //   - user1/UserSegmentServer1/key1
  //
  //   - user1/secrets/test/key2
  // POST
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

  //PUT - Update a secret => return all secrets of the path.
}
