import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserFromJwt } from '../dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_REFRESH'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, user: UserFromJwt) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { user, refreshToken };
  }
}
