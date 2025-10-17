import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PlayersRepository } from './repository/players.repository';
import { PlayersRepositoryImpl } from './repository/players.repository.implements';
import { PlayersController } from './players.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PlayersController],
  providers: [
    PrismaService,
    { provide: PlayersRepository, useClass: PlayersRepositoryImpl }
  ],
  exports: [PlayersRepository],
})
export class PlayersModule {}
