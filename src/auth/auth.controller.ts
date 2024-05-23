import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeaders } from './decorators';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('signin')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('prueba')
  @UseGuards(AuthGuard())
  pruebaLogin(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      message: 'Hola mundo',
      user,
      userEmail,
      rawHeaders,
    };
  }
  @Get('prueba2')
  @Auth(ValidRoles.superuser, ValidRoles.admin)
  pruebaLogin2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
