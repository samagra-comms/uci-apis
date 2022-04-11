import * as HasuraSecret from './hasura.secret';
import * as Headers from './headers.secret';
import * as WhatsappGupshupSecret from './whatsapp.gupshup.secret';
import * as WhatsappNetcoreSecret from './whatsapp.netcore.secrets';

export type Secret =
  | WhatsappGupshupSecret.default
  | WhatsappNetcoreSecret.default
  | HasuraSecret.default
  | Headers.default;

export enum SecretType {
  WhatsappGupshup = 'WhatsappGupshup',
  WhatsappNetcore = 'WhatsappNetcore',
  Hasura = 'Hasura',
  Headers = 'Headers',
}

// Create a type guard for Secret
export function getSecretType(secret: Secret): SecretType | null {
  if (
    'usernameHSM' in secret &&
    'passwordHSM' in secret &&
    'username2Way' in secret &&
    'password2Way' in secret
  ) {
    return SecretType.WhatsappGupshup;
  }
  if ('baseURL' in secret && 'adminSecret' in secret) {
    return SecretType.Hasura;
  }
  if ('source' in secret && 'bearer' in secret) {
    return SecretType.WhatsappNetcore;
  }
  return SecretType.Headers;
}
