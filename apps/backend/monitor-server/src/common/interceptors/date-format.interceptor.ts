import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// 扩展 dayjs 支持时区
dayjs.extend(utc)
dayjs.extend(timezone)

/** 东八区时区标识 */
const TIMEZONE_CN = 'Asia/Shanghai'
/** 日期格式化模板 */
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 日期格式化拦截器
 * 将响应中的 Date 对象转换为东八区的本地时间字符串
 * 格式：YYYY-MM-DD HH:mm:ss
 */
@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map(data => this.transformDates(data)))
  }

  /**
   * 递归转换对象中的所有 Date 类型字段
   * @param obj - 需要转换的对象
   * @returns 转换后的对象
   */
  private transformDates(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
      return obj
    }

    if (obj instanceof Date) {
      return this.formatToLocalTime(obj)
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.transformDates(item))
    }

    if (typeof obj === 'object') {
      const transformed: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        // 处理 ISO 8601 格式的时间字符串
        if (typeof value === 'string' && this.isISODateString(value)) {
          transformed[key] = this.formatToLocalTime(new Date(value))
        } else {
          transformed[key] = this.transformDates(value)
        }
      }
      return transformed
    }

    return obj
  }

  /**
   * 判断字符串是否为 ISO 8601 日期格式
   */
  private isISODateString(value: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
    return isoDateRegex.test(value)
  }

  /**
   * 将 Date 对象格式化为东八区本地时间字符串
   * @param date - Date 对象
   * @returns 格式化后的字符串 (YYYY-MM-DD HH:mm:ss)
   */
  private formatToLocalTime(date: Date): string {
    return dayjs(date).tz(TIMEZONE_CN).format(DATE_FORMAT)
  }
}
