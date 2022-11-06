import config from '../config.json'

const CALLBACK_URL = config.url + '/.netlify/functions/callback'

const SCOPE = ['identify'].join(' ')

const BASE_URL = 'https://discord.com/api/v10'

export { CALLBACK_URL, SCOPE, BASE_URL }
