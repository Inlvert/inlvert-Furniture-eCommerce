import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI')!,
      scope: ['email', 'profile'],
      prompt: 'select_account',
    } as any);
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const email = profile.emails?.[0]?.value;
    if (!email) throw new Error('No email from Google');

    const [firstName, lastName] = (profile.displayName || 'Google User').split(' ');

    return this.usersService.findOrCreateByGoogle({
      email,
      googleId: profile.id,
      firstName,
      lastName: lastName || 'User',
      avatar: profile.photos?.[0]?.value,
    });
  }
}
