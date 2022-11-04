import {builder, Handler} from '@netlify/functions'
import oauth from "./utils/discord-oauth";

const cookie = require('cookie')


const myHandler: Handler = async (event, context) => {
    const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)

    const data = await oauth.tokenRequest({
        refreshToken: cookies.discord_refresh,
        scope: ["identify"],
        grantType: 'refresh_token'
    })
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Hello World'}),
    }
}

const handler = builder(myHandler)

export {handler}
