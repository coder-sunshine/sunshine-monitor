import { SetMetadata } from '@nestjs/common'

/** 响应消息元数据 key */
export const RESPONSE_MESSAGE_KEY = 'response_message'

/**
 * 自定义响应消息装饰器
 * 用于在 Controller 方法上指定返回的 message
 * @param message - 自定义响应消息
 * @example
 * @Post()
 * @ResponseMessage('创建成功')
 * create() { ... }
 */
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE_KEY, message)
