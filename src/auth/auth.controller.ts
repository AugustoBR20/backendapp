// auth.controller.ts - rotas públicas de auth
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/login-dto';
import { CreateUserDTO } from 'src/dtos/create-user-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  // POST /api/auth/login
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  // POST /api/auth/register
  @Post('register')
  register(@Body() dto: CreateUserDTO) {
    return this.auth.register(dto);
  }

  // GET /api/auth/me - protegido pelo JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: any) {
    // JwtAuthGuard já colocou req.user
    return this.auth.meFromToken(req.user);
  }
}
