import {builder, Handler} from '@netlify/functions'
import DiscordOauth2 from "discord-oauth2";
import config from './config.json'

const cookie = require('cookie')

const oauth = new DiscordOauth2();

const myHandler: Handler = async (event, context) => {
    const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
    if (!cookies) {
        return {
            statusCode: 301,
            headers: {
                'Location': config.url + '/.netlify/functions/login'
            }
        }
    }
    return oauth.getUser(cookies.discord_token).then((res) => {
        return {
            statusCode: 200,
            body: JSON.stringify({res}),
        }
    }).catch((e) => {
        console.log(JSON.stringify(e))
        return {
            statusCode: 301,
            headers: {
                'Location': config.url + '/.netlify/functions/login'
            }
        }
    })

}

const handler = builder(myHandler)

export {handler}
