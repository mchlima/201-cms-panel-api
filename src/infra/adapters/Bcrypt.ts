import bcrypt from 'bcrypt';

import { Hasher, HashCompare } from '@/data/protocols/cryptography';

export class BcryptAdapter implements Hasher, HashCompare {
  constructor(private readonly saltRounds: number = 12) {}

  async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(plaintext, salt);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}
