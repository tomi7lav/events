import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 1 * 60 * 1000,
      sameSite: 'strict',
      domain: 'localhost',
    });

    res.json({ message: 'Login successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.register(registerDto);
    res.json({ message: 'Registration successful' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request & { user: User }) {
    return request.user;
  }
  @UseGuards(AuthGuard)
  @Get('user')
  getUser(
    @Req() request: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('LOGGED REQUEST FOR USER__________');
    res.json(request.user);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully!' };
  }
}
