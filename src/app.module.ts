// AppModule - registra módulos da aplicação
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// módulos que criamos
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { ProfilesModule } from './profiles/profiles.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    // ConfigModule global para usar process.env
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    TeamsModule,
    PlayersModule,
    ProfilesModule,
    StatsModule,
  ],
})
export class AppModule {}
