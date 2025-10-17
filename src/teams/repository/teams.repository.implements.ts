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
    return this.prisma.team.findMany({ include: { players: { include: { stats: true } } } });
  }

  // busca um time por id com jogadores
  async findOne(id: string) {
    return this.prisma.team.findUnique({ where: { id }, include: { players: { include: { stats: true } } } });
  }

  // atualiza time
  async update(id: string, dto: any) {
    return this.prisma.team.update({ where: { id }, data: dto });
  }

  // deleta time
  async delete(id: string) {
    await this.prisma.team.delete({ where: { id } });
  }
}
