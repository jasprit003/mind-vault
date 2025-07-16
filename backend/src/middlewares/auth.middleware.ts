import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/token'
import { User } from '../models/user.model'

export const auth = async (
  req: AuthRequset,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decode = verifyToken(token)
    if (!decode) {
      return res.status(401).json({ message: 'Invalid token provided' })
    }

    const user = await User.findById({ _id: decode.userId })

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ message: 'Internal error' })
  }
}

interface AuthRequset extends Request {
  user?: any
}
