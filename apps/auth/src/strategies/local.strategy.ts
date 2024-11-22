import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    // private genHash: BcryptService, // private userRepo: UsersRepository,
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    // const user = await this.userRepo.getUserByEmail(email.toLowerCase());
    //
    // if (!user || user.emailConfirmation.isConfirmed === false) return false;
    //
    // const hashPassword = await this.genHash.generateHash(
    //   password.toString(),
    //   user.passwordHash,
    // );
    // if (user.passwordHash === hashPassword) {
    //   return user;
    // } else {
    //   throw new UnauthorizedException();
    // }
  }
}
