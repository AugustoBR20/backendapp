import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeamsRepository } from './repository/teams.repository';
import { TeamsRepositoryImpl } from './repository/teams.repository.implements';
import { TeamsController } from './teams.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TeamsController],
  providers: [
    PrismaService,
    { provide: TeamsRepository, useClass: TeamsRepositoryImpl }
  ],
  exports: [TeamsRepository],
})
export class TeamsModule {}
