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


//CHECKS IF THE USER IS LOGGED IN AND RETURNS THE ID OF THE USER! 
export const checkAdmin = (request: Request) => {
  const bearer = request.headers.get("Authorization")
  if (!bearer) {
    throw Error("You are not logged in.")
  }

  const token = bearer.split(" ")[1]

  const id = verifyToken(token)._id

  if (!id) {
    throw Error("This user does not exist!")
  }

  return id
}
