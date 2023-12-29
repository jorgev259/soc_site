import { Client, GatewayIntentBits } from 'discord.js'
import axios from 'axios'

const discordToken = process.env.DISCORD
export const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] })

if (discordToken) {
  discordClient.login(discordToken)
    .then(() => console.log(`Logged in as ${discordClient.user.tag}!`))
}

export async function postWebhook (album, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `${url}${userText}`
  const payload = { content }

  axios.post(process.env.WEBHOOK_URL, payload)
    .catch(err => console.log(err))
}
