import jwt from 'jsonwebtoken'
import getEnvironmentVariable from './getEnvironmentVariable'
import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/rest/v10/oauth2'
const SECRET_KEY = getEnvironmentVariable('JWT_SECRET_KEY')

export function sign (data: Record<string, any>): string {
  return jwt.sign(data, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '1 week'
  })
}

interface CookieToken extends RESTPostOAuth2AccessTokenResult {
  userId: string
}

export function verifyAndDecode (token: string): CookieToken {
  return jwt.verify(token, SECRET_KEY) as CookieToken
}
