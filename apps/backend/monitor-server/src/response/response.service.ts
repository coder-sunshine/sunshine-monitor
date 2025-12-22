import { Injectable } from '@nestjs/common'

@Injectable()
export class ResponseService {
  success(data: any = null, message: string = 'success', code: number = 200) {
    return {
      code,
      message,
      data,
    }
  }
  error(message: string = 'error', code: number = 500) {
    return {
      code,
      message,
    }
  }
}
