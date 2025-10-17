import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesRepositoryImplements } from './repository/profiles.repository.implements';
import { ProfilesRepository } from './repository/profiles.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ProfilesController],
  providers: [
    PrismaService,
    {
      provide: ProfilesRepository,
      useClass: ProfilesRepositoryImplements
    }
  ],

})
export class ProfilesModule { }
