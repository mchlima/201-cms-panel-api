import jwt from 'jsonwebtoken';
import { Encrypter, Decrypter } from '@/data/protocols/cryptography';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(
    payload: object,
    expiresIn: string | number = '1D'
  ): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: expiresIn as any });
  }

  async decrypt(token: string): Promise<object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as object);
      });
    });
  }
}
