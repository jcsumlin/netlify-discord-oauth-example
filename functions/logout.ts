import { Handler } from '@netlify/functions'
import parseCookie from './utils/parseCookie'
import axios from 'axios'
import { BASE_URL } from './utils/discord-oauth'
import cookie from 'cookie'
import getEnvironmentVariable from './utils/getEnvironmentVariable'
import config from './config.json'
import { verifyAndDecode } from './utils/jwt'
import middy from '@middy/core'
import middleware from './middleware/auth'

const logout: Handler = async (event) => {
  const cookies = parseCookie(event.headers.cookie as string)
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const clientSecret = getEnvironmentVariable('DISCORD_CLIENT_SECRET')

  try {
    const discordCookie = verifyAndDecode(cookies.DiscordAuth)

    await axios.post(`${BASE_URL}/oauth2/token/revoke`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        token: discordCookie.access_token
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const expiredToken = cookie.serialize('DiscordAuth', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0
    })
    return {
      statusCode: 302,
      headers: {
        Location: config.url,
        'Set-Cookie': expiredToken,
        'Cache-Control': 'no-cache'
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

const handler = middy(logout)
  .use(middleware())

export { handler }
