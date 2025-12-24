import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { ApiExceptionFilter } from '../common/filters/api-exception.filter'
import { AppModule } from './app.module'
import { DateFormatInterceptor } from './common/interceptors/date-format.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const prefix = configService.get('PREFIX')

  app.setGlobalPrefix(prefix)

  // 全局异常过滤器 - 统一响应格式
  app.useGlobalFilters(new ApiExceptionFilter())

  // 全局日期格式化拦截器 - 将时间转换为东八区本地时间
  app.useGlobalInterceptors(new DateFormatInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  await app.listen(process.env.PORT)
}
bootstrap()
