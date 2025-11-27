import { Encryption } from '../encryption';
import { testData } from './test_data';

describe('Encryption core service', () => {
  it('should test "Password Encryption"', async () => {
    const encrypted = await Encryption.encrypt(testData.pwd);
    const decrypted = Encryption.decrypt(encrypted.pwd, encrypted.encKey);
    expect(decrypted).toBe(testData.pwd);
  });

  it('should test "Password Decryption"', () => {
    const decrypted = Encryption.decrypt(testData.encryptedPwd, testData.encKey);
    expect(decrypted).toBe(testData.pwd);
  });

  it('should test "Password Encryption-Decryption" failed case', async () => {
    const { pwd } = await Encryption.encrypt('TEST_password');
    expect(pwd).not.toBe(testData.pwd);
  });

  it('should test "Password Encryption" with random password', async () => {
    const p = Math.random().toString(36).slice(-8);
    const encrypted = await Encryption.encrypt(p);
    const decrypted = Encryption.decrypt(encrypted.pwd, encrypted.encKey);
    expect(decrypted).toBe(p);
  });
});
