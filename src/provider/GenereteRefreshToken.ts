import dayjs from "dayjs"
import { prismaClient } from "../prisma/prismaClient"

class GenereteRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "seconds").unix()
    const genereteRefreshToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })
    return genereteRefreshToken
  }
}

export { GenereteRefreshToken }