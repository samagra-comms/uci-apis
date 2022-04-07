import * as WhatsappSecret from './whatsapp.gupshup.secret';
import * as HasuraSecret from './hasura.secret';
import * as Headers from './headers.secret';

export enum SecretType {
  WhatsappGupshup = 'WhatsappGupshup',
  WhatsappNetcore = 'WhatsappNetcore',
  Hasura = 'Hasura',
  Headers = 'Headers',
}

export type Secret =
  | WhatsappSecret.default
  | HasuraSecret.default
  | Headers.default;
