import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsRepository } from './repository/stats.repository';
import { StatsRepositoryImpl } from './repository/stats.repository.implements';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StatsController],
  providers: [
    { provide: StatsRepository, useClass: StatsRepositoryImpl },
    PrismaService,
  ],
})
export class StatsModule {}
