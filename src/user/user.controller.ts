import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiTags
} from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { MessageResponse } from 'src/utils/types';
import { CreateUserDto, LoggedInUserDto, LoginUserDto, UserResponseDto } from './dtos/user.dtos';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUserCredentials(
      loginUserDto.email,
      loginUserDto.password,
    );
    return await this.authService.loginWithCredentials(user as any);
  }

  @Post('create-user')
  @ApiCreatedResponse({ type: MessageResponse })
  @ApiBadRequestResponse({ description: 'Something went wrong' })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const _user = await this.userService.createUser(createUserDto)
    const res : MessageResponse<UserResponseDto> = {
        message: 'User Created',
        status: true,
        data: new UserResponseDto(_user)
    }

    return res
    // return await this.authService.loginWithCredentials(user as any);
  }
}
