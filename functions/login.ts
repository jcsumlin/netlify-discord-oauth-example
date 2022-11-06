import { Handler } from '@netlify/functions'
import { CALLBACK_URL, SCOPE } from './utils/discord-oauth'
import crypto from 'crypto'
import getEnvironmentVariable from './utils/getEnvironmentVariable'

const handler: Handler = async (event, context) => {
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const OAuthData = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: CALLBACK_URL,
    scope: SCOPE,
    state: crypto.randomBytes(16).toString('hex')
  })

  return {
    statusCode: 302,
    headers: {
      Location: `https://discordapp.com/oauth2/authorize?${OAuthData}`,
      'Cache-Control': 'no-cache'
    }
  }
}

export { handler }
