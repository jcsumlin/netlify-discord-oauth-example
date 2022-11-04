import DiscordOauth2 from "discord-oauth2";
import config from '../config.json'

const oauth = new DiscordOauth2({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret:  process.env.DISCORD_CLIENT_SECRET,
    redirectUri: config.url + "/.netlify/functions/callback"
});

export default oauth
