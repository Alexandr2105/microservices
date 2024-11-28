import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async generateHashForNewUser(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return this.generateHash(password, salt);
  }

  async generateHash(pass: string, salt: string): Promise<string> {
    return bcrypt.hash(pass, salt);
  }
}
