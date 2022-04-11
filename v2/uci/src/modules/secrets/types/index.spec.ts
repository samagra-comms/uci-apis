import { Secret, getSecretType } from '.';
import { Test, TestingModule } from '@nestjs/testing';

describe('check type of secret', () => {
  it('should check an empty object with SecretType', () => {
    const secret = {} as Secret;
    expect(getSecretType(secret)).toBe('Headers');
  });

  it('should check an empty object with SecretType', () => {
    const secret = {
      usernameHSM: 'a',
      passwordHSM: 'b',
      username2Way: 'c',
      password2Way: 'd',
    } as Secret;
    expect(getSecretType(secret)).toBe('WhatsappGupshup');
  });
});
