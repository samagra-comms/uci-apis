import FusionAuthClient from "@fusionauth/typescript-client";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FusionAuthClientProvider {
    client: FusionAuthClient;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.client = new FusionAuthClient(
            configService.get<string>('FUSIONAUTH_KEY') as string,
            configService.get<string>('FUSIONAUTH_URL') as string,
        );
    }

    getClient(): FusionAuthClient {
        if (!this.client) {
            throw new InternalServerErrorException('FusionAuthClient could not be initialized!');
        }
        return this.client;
    }
}
