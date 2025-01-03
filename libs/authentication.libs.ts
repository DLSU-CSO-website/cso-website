import jwt, { JwtPayload } from 'jsonwebtoken'

export interface CustomJwtPayload extends JwtPayload {
  _id: string
}

export const signToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: "3w" })
}

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  return decoded as CustomJwtPayload
}
