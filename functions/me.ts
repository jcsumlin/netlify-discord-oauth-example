import { builder, Handler } from '@netlify/functions'
import axios from 'axios'
import { BASE_URL } from './utils/discord-oauth'
import parseCookie from './utils/parseCookie'

const myHandler: Handler = async (event, context) => {
  if (!event.headers.cookie) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Not logged in' })
    }
  }
  const cookies = parseCookie(event.headers.cookie)
  try {
    const { data } = await axios.get(`${BASE_URL}/oauth2/@me`, {
      headers: {
        Authorization: `Bearer ${cookies.discord_token}`
      }
    })
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
