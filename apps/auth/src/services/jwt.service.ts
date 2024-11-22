import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import process from 'node:process';

@Injectable()
export class Jwt {
  constructor(private jwt: JwtService) {}

  async creatJWT(id: string): Promise<{ accessToken: string }> {
    return {
      accessToken: this.jwt.sign(
        { userId: id },
        { expiresIn: process.env.TOKEN_LIFE, secret: process.env.JWT_SECRET },
      ),
    };
  }

  getUserIdByToken(token: string) {
    try {
      const result: any = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return result.userId;
    } catch (error) {
      return null;
    }
  }

  decodeUserByToken(token: string) {
    try {
      return this.jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}