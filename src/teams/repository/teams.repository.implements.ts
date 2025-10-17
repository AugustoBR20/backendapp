import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeamsRepository } from './teams.repository';

@Injectable()
export class TeamsRepositoryImpl implements TeamsRepository {
  constructor(private prisma: PrismaService) {}

  // cria time
  async create(dto: any) {
    return this.prisma.team.create({ data: dto });
  }

  // lista times incluindo jogadores
  async findAll() {
    return this.prisma.team.findMany({ include: { players: true } });
  }

  // busca um time por id com jogadores
  async findOne(id: number) {
    return this.prisma.team.findUnique({ where: { id }, include: { players: true } });
  }

  // atualiza time
  async update(id: number, dto: any) {
    return this.prisma.team.update({ where: { id }, data: dto });
  }

  // deleta time
  async delete(id: number) {
    await this.prisma.team.delete({ where: { id } });
  }
}
