import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }
}
