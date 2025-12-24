import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator'

import { ApplicationType } from '@/generated/prisma/client'

/**
 * 创建应用的 DTO
 */
export class CreateApplicationDto {
  /**
   * 项目类型
   * @example 'vanilla'
   */
  @IsEnum(ApplicationType, { message: '项目类型必须是 vanilla、react 或 vue' })
  type: ApplicationType

  /**
   * 项目名称
   * @example '我的监控项目'
   */
  @IsString({ message: '项目名称必须是字符串' })
  @MaxLength(255, { message: '项目名称最大长度为 255 个字符' })
  name: string

  /**
   * @example '这是一个前端监控项目'
   */
  @IsString({ message: '项目描述必须是字符串' })
  description: string

  /**
   * 项目所属用户 ID
   * @example 1
   */
  @IsInt({ message: '用户 ID 必须是整数' })
  userId: number
}
