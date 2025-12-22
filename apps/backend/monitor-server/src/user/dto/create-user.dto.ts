import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  username: string

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  role?: string
}
