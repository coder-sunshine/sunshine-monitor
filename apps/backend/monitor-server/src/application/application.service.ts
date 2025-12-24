import { Injectable, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { Prisma } from '@/generated/prisma/client'

import { PrismaService } from '../prisma'
import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'
import { Application } from './entities/application.entity'

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建新应用
   * @param createApplicationDto - 创建应用的数据
   * @returns 创建的应用
   * @throws NotFoundException 当用户不存在时
   */
  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    // 生成唯一的 appId
    const appId = this.generateAppId()

    const data: Prisma.ApplicationCreateInput = {
      appId,
      type: createApplicationDto.type,
      name: createApplicationDto.name,
      description: createApplicationDto.description,
      user: {
        connect: { id: createApplicationDto.userId },
      },
    }

    return this.prisma.application.create({ data })
  }

  /**
   * 获取所有应用列表
   * @returns 应用数组
   */
  async findAll(): Promise<Application[]> {
    return this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * 根据用户 ID 获取应用列表
   * @param userId - 用户 ID
   * @returns 该用户的应用数组
   */
  async findByUserId(userId: number): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * 根据 ID 获取单个应用
   * @param id - 应用 ID
   * @returns 应用详情
   * @throws NotFoundException 当应用不存在时
   */
  async findOne(id: number): Promise<Application> {
    const application = await this.prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      throw new NotFoundException(`应用 ID ${id} 不存在`)
    }

    return application
  }

  /**
   * 根据 appId 获取应用
   * @param appId - 应用唯一标识
   * @returns 应用详情
   * @throws NotFoundException 当应用不存在时
   */
  async findByAppId(appId: string): Promise<Application> {
    const application = await this.prisma.application.findFirst({
      where: { appId },
    })

    if (!application) {
      throw new NotFoundException(`应用 ${appId} 不存在`)
    }

    return application
  }

  /**
   * 更新应用信息
   * @param id - 应用 ID
   * @param updateApplicationDto - 更新数据
   * @returns 更新后的应用
   */
  async update(id: number, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    // 先检查应用是否存在
    await this.findOne(id)

    return this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    })
  }

  /**
   * 删除应用
   * @param id - 应用 ID
   * @returns 被删除的应用
   */
  async remove(id: number): Promise<Application> {
    // 先检查应用是否存在
    await this.findOne(id)

    return this.prisma.application.delete({
      where: { id },
    })
  }

  /**
   * 生成唯一的 appId
   * @returns 格式为 app_xxxxxxxx 的唯一标识
   */
  private generateAppId(): string {
    return `app_${randomUUID().replace(/-/g, '').slice(0, 16)}`
  }
}
