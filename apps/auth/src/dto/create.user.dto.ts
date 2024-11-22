import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => String(value).trim())
  login: string;

  @IsEmail()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email: string;

  @Transform(({ value }) => String(value).trim())
  password: string;
}
