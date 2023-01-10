import { builder, Handler } from '@netlify/functions'
import { getUserInformation } from './utils/discord-oauth'
import parseCookie from './utils/parseCookie'
import { verifyAndDecode } from './utils/jwt'

const myHandler: Handler = async (event, context) => {
  const cookies = parseCookie(event.headers.cookie as string)
  try {
    const discordCookie = verifyAndDecode(cookies.DiscordAuth)
    const data = await getUserInformation(discordCookie.access_token)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
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
