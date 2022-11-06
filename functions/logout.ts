import { builder, Handler } from '@netlify/functions'
import parseCookie from './utils/parseCookie'
import axios from 'axios'
import { BASE_URL, CALLBACK_URL } from './utils/discord-oauth'
import cookie from 'cookie'
import getEnvironmentVariable from './utils/getEnvironmentVariable'

const myHandler: Handler = async (event, context) => {
  if (!event.headers.cookie) {
    return {
      statusCode: 500
    }
  }
  const cookies = parseCookie(event.headers.cookie)
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const clientSecret = getEnvironmentVariable('DISCORD_CLIENT_SECRET')
  try {
    const { data } = await axios.post(`${BASE_URL}/oauth2/token/revoke`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        token: cookies.discord_token
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const token = cookie.serialize('discord_token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0
    })
    const refresh = cookie.serialize('discord_refresh', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully logged out', data }),
      multiValueHeaders: {
        'Set-Cookie': [token, refresh]
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

const handler = builder(myHandler)

export { handler }
