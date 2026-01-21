import { IsEmail, IsString } from 'class-validator';

export class OAuthUserDto {
  @IsEmail()
  email: string;

  @IsString()
  googleId: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  avatar?: string;
}
