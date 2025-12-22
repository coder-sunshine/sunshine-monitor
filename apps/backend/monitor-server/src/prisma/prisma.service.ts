import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { PrismaClient } from '@/generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    // Prisma 7.x 需要使用 Driver Adapter 连接数据库
    const connectionString = configService.get<string>('DATABASE_URL')

    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)

    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
