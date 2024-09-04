import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  firstName: string;

  @IsString()
  @MinLength(4)
  lastName: string;
}
