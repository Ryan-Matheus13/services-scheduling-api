import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('logout')
  async logout(@Body() body: { token: string }) {
    try {
      await this.authService.addTokenToBlacklist(body.token);
      return { message: 'Logout successful' };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
