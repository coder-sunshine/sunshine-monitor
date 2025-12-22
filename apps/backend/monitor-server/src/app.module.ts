import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { loadConfig } from './config'
import { PrismaModule } from './prisma'
import { ResponseInterceptor } from './response'
import { ResponseModule } from './response/response.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    PrismaModule,
    UserModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局响应拦截器，统一响应格式
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
