import { builder, Handler } from '@netlify/functions'
import { getUserInformation } from './utils/discord-oauth'
import parseCookie from './utils/parseCookie'
import { verifyAndDecode } from './utils/jwt'
import middy from '@middy/core'
import middleware from './middleware/auth'

const myHandler: Handler = async (event) => {
  const cookies = parseCookie(event.headers.cookie as string)
  try {
    const discordCookie = verifyAndDecode(cookies.DiscordAuth)
    const data = await getUserInformation(discordCookie.access_token)
    return {
      statusCode: 200,
      body: JSON.stringify({ ...data, token: cookies.DiscordAuth })
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

const handler = middy(builder(myHandler))
  .use(middleware())

export { handler }
