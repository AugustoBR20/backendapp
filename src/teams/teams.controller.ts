import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TeamsRepository } from './repository/teams.repository';
import { CreateTeamDTO } from 'src/dtos/create-team-dto';
import { UpdateTeamDTO } from 'src/dtos/update-team-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('teams')
export class TeamsController {
  constructor(private teamsRepo: TeamsRepository) {}

  // GET /api/teams (público)
  @Get()
  findAll() { return this.teamsRepo.findAll(); }

  // GET /api/teams/:id (público)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.teamsRepo.findOne(id); }

  // Rotas a seguir exigem ADMIN
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTeamDTO) { return this.teamsRepo.create(dto); }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeamDTO) { return this.teamsRepo.update(id, dto); }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.teamsRepo.delete(id); }
}
