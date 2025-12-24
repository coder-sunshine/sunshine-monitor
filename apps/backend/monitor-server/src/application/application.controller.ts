import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'

import { ApplicationService } from './application.service'
import { CreateApplicationDto } from './dto/create-application.dto'
import { UpdateApplicationDto } from './dto/update-application.dto'

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  /**
   * 创建新应用
   * POST /application
   */
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto)
  }

  /**
   * 获取所有应用列表
   * GET /application
   * GET /application?userId=1 (按用户筛选)
   */
  @Get()
  findAll(@Query('userId') userId?: number) {
    if (userId) {
      return this.applicationService.findByUserId(userId)
    }
    return this.applicationService.findAll()
  }

  /**
   * 根据 ID 获取单个应用
   * GET /application/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.findOne(id)
  }

  /**
   * 更新应用信息
   * PATCH /application/:id
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(id, updateApplicationDto)
  }

  /**
   * 删除应用
   * DELETE /application/:id
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.remove(id)
  }
}
