// auth.service.ts - lógica de login / register / meFromToken
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/users/repository/users.repository';
import { CreateUserDTO } from 'src/dtos/create-user-dto';

@Injectable()
export class AuthService {
  // injeta JwtService e o repositório abstrato de Users
  constructor(private jwt: JwtService, private usersRepo: UsersRepository) {}

  // login: valida credenciais, gera access_token
  async login(email: string, password: string) {
    // procura usuário por email
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    // compara senha com o hash armazenado
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    // payload minimalista para o token
    const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
    return {
      access_token: await this.jwt.signAsync(payload),
      user: payload
    };
  }

  // register: cria usuário via repositório e já retorna token
  async register(dto: CreateUserDTO) {
    const created = await this.usersRepo.createUser(dto);
    const payload = { sub: created.id, email: created.email, name: created.name, role: created.role };
    return {
      access_token: await this.jwt.signAsync(payload),
      user: payload
    };
  }

  // meFromToken: dado payload (req.user) retorna dados completos do usuário
  async meFromToken(tokenPayload: any) {
    if (!tokenPayload?.sub) throw new UnauthorizedException();
    const user = await this.usersRepo.findById(Number(tokenPayload.sub));
    if (!user) throw new UnauthorizedException();
    // remove passwordHash antes de retornar
    const { passwordHash, ...safe } = user as any;
    return safe;
  }
}
