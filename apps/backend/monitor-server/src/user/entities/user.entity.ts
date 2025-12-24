import { UserModel } from '@/generated/prisma/models/User'

export class User implements Omit<UserModel, 'password'> {
  id: number
  email: string
  username: string
  phone: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export class UserWithPassword implements UserModel {
  id: number
  email: string
  username: string
  password: string
  phone: string
  role: string
  createdAt: Date
  updatedAt: Date
}
