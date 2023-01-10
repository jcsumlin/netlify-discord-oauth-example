import config from '../config.json'
import getEnvironmentVariable from './getEnvironmentVariable'
import axios from 'axios'
import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10'
import { RESTGetAPIOAuth2CurrentAuthorizationResult } from 'discord-api-types/rest/v10/oauth2'

const CALLBACK_URL = config.url + '/.netlify/functions/callback'

const SCOPE = ['identify'].join(' ')

const BASE_URL = 'https://discord.com/api/v10'

async function validateToken (code: string): Promise<RESTPostOAuth2AccessTokenResult> {
  const clientId = getEnvironmentVariable('DISCORD_CLIENT_ID')
  const clientSecret = getEnvironmentVariable('DISCORD_CLIENT_SECRET')
  const parameters = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: CALLBACK_URL,
    scope: 'identify'
  }
  const { data } = await axios.post(`${BASE_URL}/oauth2/token`,
    parameters,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return data
}

async function getUserInformation (token: string): Promise<RESTGetAPIOAuth2CurrentAuthorizationResult> {
  const { data } = await axios.get(`${BASE_URL}/oauth2/@me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export { CALLBACK_URL, SCOPE, BASE_URL, validateToken, getUserInformation }
