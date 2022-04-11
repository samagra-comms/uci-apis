import { Secret, SecretType } from './types';

export type SecretDTO = {
  secretBody: Secret;
  type: SecretType;
  variableName: string;
  ownerId: string;
};
