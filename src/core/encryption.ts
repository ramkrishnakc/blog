import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const algorithm = 'aes-256-ctr';

export const Encryption = {
  encrypt: async (pwd: string) => {
    if (!pwd) return { pwd: '', encKey: '' };

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const iv = randomBytes(16);
    const salt = (await promisify(scrypt)(process.env.API_KEY as string, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(algorithm, salt, iv);

    return {
      pwd: Buffer.concat([cipher.update(pwd), cipher.final()]).toString('hex'),
      encKey: `${salt.toString('hex')}::${iv.toString('hex')}`,
    };
  },
  decrypt: (pwd: string, encKey: string) => {
    const [salt, iv] = encKey.split('::');
    const decipher = createDecipheriv(algorithm, Buffer.from(salt, 'hex'), Buffer.from(iv, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(pwd, 'hex')), decipher.final()]).toString();
  },
};
