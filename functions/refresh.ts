import { builder, Handler } from '@netlify/functions'
import axios from 'axios'
import cookie from 'cookie'
import config from './config.json'
import { BASE_URL } from './utils/discord-oauth'
import parseCookie from './utils/parseCookie'

const myHandler: Handler = async (event, context) => {
  if (!event.headers.cookie) {
    return {
      statusCode: 500
    }
  }
  const cookies = parseCookie(event.headers.cookie)
  try {
    const { data } = await axios.post(`${BASE_URL}/oauth2/token`,
      {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: cookies.discord_refresh
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    const token = cookie.serialize('discord_token', data.access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: data.expires_in
    })
    const refresh = cookie.serialize('discord_refresh', data.refresh_token, {
      httpOnly: true,
      secure: true,
      path: '/'
    })
    return {
      statusCode: 302,
      multiValueHeaders: {
        'Set-Cookie': [token, refresh]
      },
      headers: {
        Location: config.url,
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

const handler = builder(myHandler)

export { handler }
