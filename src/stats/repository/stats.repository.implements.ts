import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StatsRepository } from './stats.repository';

@Injectable()
export class StatsRepositoryImpl implements StatsRepository {
  constructor(private prisma: PrismaService) {}

  // cria estatística
  async create(dto: any) {
    return this.prisma.seasonStat.create({ data: dto });
  }

  // busca todas as estatísticas
  async findAll(params?: any) {
    const where: any = {};
    if (params?.season) where.season = params.season;
    if (params?.playerId) where.playerId = Number(params.playerId);
    return this.prisma.seasonStat.findMany({ 
      where, 
      include: { player: { include: { team: true } } } 
    });
  }

  // busca uma estatística por id
  async findOne(id: number) {
    const stat = await this.prisma.seasonStat.findUnique({ 
      where: { id }, 
      include: { player: { include: { team: true } } } 
    });
    if (!stat) throw new NotFoundException('Season stat not found');
    return stat;
  }

  // busca estatísticas de um jogador específico
  async findByPlayer(playerId: number) {
    return this.prisma.seasonStat.findMany({ 
      where: { playerId }, 
      include: { player: { include: { team: true } } } 
    });
  }

  // atualiza estatística
  async update(id: number, dto: any) {
    return this.prisma.seasonStat.update({ where: { id }, data: dto });
  }

  // deleta estatística
  async delete(id: number) {
    await this.prisma.seasonStat.delete({ where: { id } });
  }
}
