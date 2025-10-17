
// PrismaService - wrapper do PrismaClient para usar com Nest lifecycle hooks
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// estendemos PrismaClient para aproveitar DI do Nest
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // chamado quando módulo inicia -> conecta com o DB
  async onModuleInit() {
    await this.$connect();
  }

  // quando o módulo é destruído (ex.: shutdown) -> desconecta
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

