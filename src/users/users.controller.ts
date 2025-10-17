// controller dos users - rotas administrativas protegidas por JWT + RolesGuard
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDTO } from 'src/dtos/create-user-dto';
import { UpdateUserDTO } from 'src/dtos/update-user-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersRepo: UsersRepository) {}

  // GET /api/users (apenas ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersRepo.getAllUsers();
  }

  // POST /api/users (apenas ADMIN) - cria novo usuário via repositorio
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateUserDTO) {
    return this.usersRepo.createUser(dto);
  }

  // PUT /api/users/:id (apenas ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDTO) {
    return this.usersRepo.updateUser(id, dto);
  }

  // DELETE /api/users/:id (apenas ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersRepo.deleteUser(id);
  }
}
