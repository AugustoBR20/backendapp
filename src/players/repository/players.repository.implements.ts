// implementação do repositório de players usando Prisma
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PlayersRepository } from './players.repository';

@Injectable()
export class PlayersRepositoryImpl implements PlayersRepository {
  constructor(private prisma: PrismaService) {}

  // cria player simples
  async create(dto: any) {
    return this.prisma.player.create({ data: dto });
  }

  // busca com filtros simples (teamId, position)
  async findAll(query?: any) {
    const where: any = {};
    if (query?.teamId) where.teamId = query.teamId;
    if (query?.position) where.position = query.position;
    return this.prisma.player.findMany({ where, include: { stats: true, team: true } });
  }

  // busca um jogador por id
  async findOne(id: number) {
    const p = await this.prisma.player.findUnique({ where: { id }, include: { stats: true, team: true } });
    if (!p) throw new NotFoundException('Player not found');
    return p;
  }

  // atualiza jogador
  async update(id: number, dto: any) {
    return this.prisma.player.update({ where: { id }, data: dto });
  }

  // deleta jogador
  async delete(id: number) {
    await this.prisma.player.delete({ where: { id } });
  }

  // transferência: envolve transação para garantir atomicidade
  async transfer(playerId: number, toTeamId: string, performedBy?: number) {
    return this.prisma.$transaction(async (tx) => {
      // busca jogador atual
      const player = await tx.player.findUnique({ where: { id: playerId } });
      if (!player) throw new NotFoundException('Player not found');

      // verifica time de destino
      const team = await tx.team.findUnique({ where: { id: toTeamId } });
      if (!team) throw new NotFoundException('Destination team not found');

      // atualiza teamId do jogador
      const updated = await tx.player.update({
        where: { id: playerId },
        data: { teamId: toTeamId },
      });

      // registra a transferência no TransferLog
      await tx.transferLog.create({
        data: {
          playerId,
          fromTeamId: player.teamId,
          toTeamId,
          performedBy: performedBy ?? null,
        },
      });

      // retorna jogador atualizado
      return updated;
    });
  }
}
