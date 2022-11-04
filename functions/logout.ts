import {builder, Handler} from '@netlify/functions'
import DiscordOauth2 from "discord-oauth2";
const cookie = require('cookie')

const oauth = new DiscordOauth2();

const myHandler: Handler = async (event, context) => {
    const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
    const utf8Encoded = decodeURIComponent(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`)
    const credentials = Buffer.from(utf8Encoded).toString('base64')
    const data = await oauth.revokeToken(cookies.discord_token, credentials)
    const tokenCookie = cookie.serialize('discord_token', null, {
        httpOnly: true,
        maxAge: 0
    })
    const refreshCookie = cookie.serialize('discord_refresh', null, {
        httpOnly: true
    })
    return {
        statusCode: 200,
        body: JSON.stringify({data}),
        multiValueHeaders: {
            'Set-Cookies': [tokenCookie, refreshCookie]
        }
    }
}

const handler = builder(myHandler)

export {handler}
