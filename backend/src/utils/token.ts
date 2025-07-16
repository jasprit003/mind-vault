import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export const signToken = (id: string) => {
  return jwt.sign(
    {
      userId: id,
    },
    JWT_SECRET,
  )
}

export const verifyToken = (token: string) => {
  // Verify token and send along
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}
