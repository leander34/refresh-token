import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prismaClient } from '../../prisma/prismaClient'
import { GenereteRefreshToken } from '../../provider/GenereteRefreshToken'
import { GenereteTokenProvider } from '../../provider/GenereteTokenProvider'

interface UserAuthenticate {
  username: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ username, password }: UserAuthenticate) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlreadyExists) {
      throw new Error("User or passowrd incorrect!")
    }

    // verificar a senha
    const passwordMatches = await compare(password, userAlreadyExists.password)
    if(!passwordMatches) {
      throw new Error("User or passowrd incorrect!")
    }

    // criar o jwt
    const genereteTokenProvider = new GenereteTokenProvider()
    const token = await genereteTokenProvider.execute(userAlreadyExists.id)

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })
    
    const genereteRefreshToken = new GenereteRefreshToken()
    const refreshToken = await genereteRefreshToken.execute(userAlreadyExists.id)
    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }