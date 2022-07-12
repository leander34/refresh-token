import dayjs from "dayjs"
import { prismaClient } from "../../prisma/prismaClient"
import { GenereteRefreshToken } from "../../provider/GenereteRefreshToken"
import { GenereteTokenProvider } from "../../provider/GenereteTokenProvider"


class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken) {
      throw new Error("refresh token invalid")
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))
    const genereteTokenProvider = new GenereteTokenProvider()
    const token = await genereteTokenProvider.execute(refreshToken.userId)

    if(refreshTokenExpired) {
      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })

      const genereteRefreshTokenProvider = new GenereteRefreshToken()
      const newRefreshToken = await genereteRefreshTokenProvider.execute(refreshToken.userId)

      return { token, newRefreshToken }
    }


    return { token }
  }
}


export { RefreshTokenUserUseCase }