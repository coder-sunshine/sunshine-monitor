import { ApplicationType } from '@/generated/prisma/client'

/**
 * Application 实体类型（对应 Prisma 模型）
 */
export interface Application {
  /** 主键 ID */
  id: number
  /** 项目唯一标识 */
  appId: string
  /** 项目类型 */
  type: ApplicationType
  /** 项目名称 */
  name: string
  /** 项目描述 */
  description: string
  /** 创建时间 */
  createdAt: Date
  /** 更新时间 */
  updatedAt: Date
  /** 所属用户 ID */
  userId: number
}

/**
 * 包含用户信息的 Application
 */
export interface ApplicationWithUser extends Application {
  user: {
    id: number
    username: string
    email: string
  }
}
