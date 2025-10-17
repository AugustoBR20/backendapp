import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repository/users.repository';
import { UsersRepositoryImpl } from './repository/users.repository.implements';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)], // 👈 adicionado aqui também
  controllers: [UsersController],
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: UsersRepositoryImpl },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}

