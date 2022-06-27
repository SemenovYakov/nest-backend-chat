import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const userData = await this.authService.registration(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('/login')
  async login(@Body() userDto: LoginDto, @Res() res: Response) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  }

  @Get('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(token);
  }
}
