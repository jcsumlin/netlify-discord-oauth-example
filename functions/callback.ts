import { Handler } from '@netlify/functions'
import axios from 'axios'
import { BASE_URL, CALLBACK_URL } from './utils/discord-oauth'
import cookie from 'cookie'
import config from './config.json'
import getEnvironmentVariable from './utils/getEnvironmentVariable'

const handler: Handler = async (event, context) => {
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const clientSecret = getEnvironmentVariable('DISCORD_CLIENT_SECRET')
  if (event.queryStringParameters !== null && 'code' in event.queryStringParameters) {
    try {
      const { data } = await axios.post(`${BASE_URL}/oauth2/token`,
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code: event.queryStringParameters.code,
          redirect_uri: CALLBACK_URL
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
  return {
    statusCode: 500
  }
}

export { handler }
