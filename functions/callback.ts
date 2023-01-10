import { Handler } from '@netlify/functions'
import { getUserInformation, validateToken } from './utils/discord-oauth'
import cookie from 'cookie'
import config from './config.json'
import { sign } from './utils/jwt'

const handler: Handler = async (event, context) => {
  if (event.queryStringParameters !== null && 'code' in event.queryStringParameters) {
    try {
      const data = await validateToken(event.queryStringParameters.code as string)
      const user = await getUserInformation(data.access_token)
      const token = sign({ ...data, userId: user.user?.id })
      const discordCookie = cookie.serialize('DiscordAuth', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: data.expires_in
      })
      return {
        statusCode: 302,
        headers: {
          Location: config.url + '/dashboard',
          'Set-Cookie': discordCookie,
          'Cache-Control': 'no-cache'
        }
      }
    } catch (e: unknown) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e })
      }
    }
  }
  return {
    statusCode: 500
  }
}

export { handler }
