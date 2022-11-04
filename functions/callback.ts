import {builder, Handler} from '@netlify/functions'
import config from './config.json'
import oauth from "./utils/discord-oauth";

const cookie = require('cookie')

const myHandler: Handler = async (event, context) => {
    if (!event.rawUrl) {
        return {
            statusCode: 401,
            body: JSON.stringify({message: 'Hello World', event})
        }
    }
    const params = new URLSearchParams(event.rawQuery)
    const code = params.get("code")
    if (!code) {
        return {
            statusCode: 401
        }
    }
    console.warn(params)
    const data = await oauth.tokenRequest({
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scope: ["identify"],
        grantType: 'authorization_code',
        code,
    })
    const tokenCookie = cookie.serialize('discord_token', data.access_token, {
        httpOnly: true,
        maxAge: data.expires_in
    })
    const refreshCookie = cookie.serialize('discord_refresh', data.refresh_token, {
        httpOnly: true
    })
    return {
        statusCode: 302,
        multiValueHeaders: {
            'Set-Cookie': [tokenCookie, refreshCookie],
        },
        headers: {
            'Location': config.url
        }
    }
}

const handler = builder(myHandler)

export {handler}
