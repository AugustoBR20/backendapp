import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { PlayersRepository } from './repository/players.repository';
import { CreatePlayerDTO } from 'src/dtos/create-player-dto';
import { UpdatePlayerDTO } from 'src/dtos/update-player-dto';
import { TransferPlayerDTO } from 'src/dtos/transfer-player-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('players')
export class PlayersController {
  constructor(private playersRepo: PlayersRepository) {}

  // GET /api/players -> público, aceita querys simples
  @Get()
  findAll(@Query() query: any) { return this.playersRepo.findAll(query); }

  // GET /api/players/:id -> público
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.playersRepo.findOne(id); }

  // As operações de criação/atualização/exclusão e transferência são ADMIN
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePlayerDTO) { return this.playersRepo.create(dto); }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlayerDTO) { return this.playersRepo.update(id, dto); }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.playersRepo.delete(id); }

  // POST /api/players/:id/transfer { toTeamId } - registra performedBy via req.user.sub
  @UseGuards(JwtAuthGuard)
  @Post(':id/transfer')
  transfer(@Param('id', ParseIntPipe) id: number, @Body() dto: TransferPlayerDTO, @Request() req: any) {
    const performedBy = req.user?.sub ? Number(req.user.sub) : undefined;
    return this.playersRepo.transfer(id, dto.toTeamId, performedBy);
  }
}
