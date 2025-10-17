import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { StatsRepository } from './repository/stats.repository';
import { CreateSeasonStatDTO } from 'src/dtos/create-season-stat-dto';
import { UpdateSeasonStatDTO } from 'src/dtos/update-season-stat-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('stats')
export class StatsController {
  constructor(private statsRepo: StatsRepository) {}

  // GET /api/stats -> público, busca estatísticas
  @Get()
  findAll(@Param() params: any) { return this.statsRepo.findAll(params); }

  // GET /api/stats/:id -> público
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.statsRepo.findOne(id); }

  // GET /api/stats/player/:playerId -> público, busca stats de um jogador
  @Get('player/:playerId')
  findByPlayer(@Param('playerId', ParseIntPipe) playerId: number) { return this.statsRepo.findByPlayer(playerId); }

  // As operações de criação/atualização/exclusão são ADMIN
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSeasonStatDTO) { return this.statsRepo.create(dto); }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSeasonStatDTO) { return this.statsRepo.update(id, dto); }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.statsRepo.delete(id); }
}
