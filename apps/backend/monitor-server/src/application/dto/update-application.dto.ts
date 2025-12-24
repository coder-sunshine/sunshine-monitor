import { PartialType } from '@nestjs/mapped-types'

import { CreateApplicationDto } from './create-application.dto'

/**
 * 更新应用的 DTO
 * 继承自 CreateApplicationDto，所有字段都是可选的
 */
export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
