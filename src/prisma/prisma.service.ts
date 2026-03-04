import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL || '';

    if (
      databaseUrl.includes('neon.tech') ||
      databaseUrl.includes('neon.database')
    ) {
      const adapter = new PrismaNeon({
        connectionString: databaseUrl,
      });

      super({ adapter });
    } else {
      const adapter = new PrismaPg({
        connectionString: databaseUrl,
      });

      super({ adapter });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
