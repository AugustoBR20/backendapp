// implementação do repositório usando Prisma e bcrypt
import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  // cria usuário, validando se email já existe e gerando hash de senha
  async createUser(dto: any) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email já cadastrado');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: dto.role ?? 'USER'
      }
    });
  }

  // lista usuários (expondo apenas campos públicos)
  async getAllUsers() {
    return this.prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // atualiza usuário; se senha for fornecida, gera novo hash
  async updateUser(id: number, dto: any) {
    const data: any = {};
    if (dto.name) data.name = dto.name;
    if (dto.email) data.email = dto.email;
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
