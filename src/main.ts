// main.ts - ponto de entrada da aplicação Nest
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // cria a app Nest
  const app = await NestFactory.create(AppModule);

  // prefixo global para as rotas (ex.: /api/teams)
  app.setGlobalPrefix('api');

  // validação global com class-validator (whitelist remove campos extras)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // porta via env ou 3000
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`✅ Server running on http://localhost:${port}/api`);
}
bootstrap();

