import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
// import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Roles } from 'src/utils/types';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {userId: string, role: Roles}) {
    return { userId: payload.userId, role: payload.role };
  }
}