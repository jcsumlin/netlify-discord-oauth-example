import { builder, Handler } from '@netlify/functions'
import axios from 'axios'
import cookie from 'cookie'
import config from './config.json'
import { BASE_URL, getUserInformation } from './utils/discord-oauth'
import parseCookie from './utils/parseCookie'
import { sign, verifyAndDecode } from './utils/jwt'

const myHandler: Handler = async (event, context) => {
  const cookies = parseCookie(event.headers.cookie as string)
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { refresh_token } = verifyAndDecode(cookies.DiscordAuth)

    const { data } = await axios.post(`${BASE_URL}/oauth2/token`,
      {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
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
        Location: config.url,
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

const handler = builder(myHandler)

export { handler }
