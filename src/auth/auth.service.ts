import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from 'src/models/user.entity';
import { compare } from 'bcrypt';
import { MessageResponse } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtTokenService: JwtService
  ) {}

  async validateUserCredentials(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException({message: 'Invalid Credentials'})

    if (!user.isActive)
      throw new UnauthorizedException({
        message: 'Sorry your Acount has been Blocked!. Please contact Support',
      });

    const isMatch = await compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException({message: 'Invalid Credentials'})
  }

  async loginWithCredentials(user: User) {
    if (!user) {
      throw new UnauthorizedException({
        message: 'Wrong username or password',
      });
    }
    const payload = { role: user.role, userId: user.userId };
    const token = this.jwtTokenService.sign(payload, {secret: process.env.JWT_SECRET, expiresIn: '3600s'})

    const res : MessageResponse<string> = {
      message: 'Login Successful',
      status: true,
      data: token
    }

    return res
  }
}
