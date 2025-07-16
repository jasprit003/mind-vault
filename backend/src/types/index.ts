import { Request } from 'express'
import { Types } from 'mongoose'

export interface CustomRequest extends Request {
  user: {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
  }
}
