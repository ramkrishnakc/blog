import { Encryption } from '../encryption';

const PWD = 'myPassword123';
const SAVED_PWD = 'd0274d42a042a7ed072fc42da7';
const ENC_KEY =
  'e831a4ae99d372ef54358bd93aebec4db7d4365ca5d0bcac8b124bc33a3aeb45::2fbecdcc2b4a8b21c14f6737c53f770a';

describe('Encryption core service', () => {
  it('should test "Password Encryption"', async () => {
    const encrypted = await Encryption.encrypt(PWD);
    const decrypted = Encryption.decrypt(encrypted.pwd, encrypted.encKey);
    expect(decrypted).toBe(PWD);
  });

  it('should test "Password Decryption"', () => {
    const decrypted = Encryption.decrypt(SAVED_PWD, ENC_KEY);
    expect(decrypted).toBe(PWD);
  });

  it('should test "Password Encryption-Decryption" failed case', async () => {
    const { pwd } = await Encryption.encrypt('TEST_password');
    expect(pwd).not.toBe(PWD);
  });

  it('should test "Password Encryption" with random password', async () => {
    const p = Math.random().toString(36).slice(-8);
    const encrypted = await Encryption.encrypt(p);
    const decrypted = Encryption.decrypt(encrypted.pwd, encrypted.encKey);
    expect(decrypted).toBe(p);
  });
});
