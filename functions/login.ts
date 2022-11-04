import { builder, Handler } from '@netlify/functions'
import oauth from "./utils/discord-oauth";
const crypto = require('crypto');


const myHandler: Handler = async (event, context) => {
    try {
        var data = oauth.generateAuthUrl({
            scope: ["identify"],
            state: crypto.randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
        })
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }

    return {
        statusCode: 302,
        headers: {
            Location: data,
            'Cache-Control': 'no-cache',
        },
    }
}

const handler = builder(myHandler)

export { handler }
