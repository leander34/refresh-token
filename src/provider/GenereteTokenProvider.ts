import { sign } from 'jsonwebtoken'

class GenereteTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "1838619a-ab4f-4ce5-8168-f4343bb5b27e", {
      subject: userId,
      expiresIn: "20s"
    })

    return token
  }
}


export  { GenereteTokenProvider }