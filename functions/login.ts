import { builder, Handler } from '@netlify/functions'
import { CALLBACK_URL, SCOPE } from './utils/discord-oauth'
import crypto from 'crypto'
import getEnvironmentVariable from './utils/getEnvironmentVariable'

const myHandler: Handler = async () => {
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const OAuthData = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: CALLBACK_URL,
    scope: SCOPE,
    state: crypto.randomBytes(16).toString('hex')
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url: `https://discordapp.com/oauth2/authorize?${OAuthData}`
    })
  }
}

const handler = builder(myHandler)

export { handler }
