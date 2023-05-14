// const Reddit = require('reddit')
import { Client, GatewayIntentBits } from 'discord.js'

const redditConfig = process.env.REDDIT
const discordToken = process.env.DISCORD

// let reddit
// const flairs = []

async function runReddit () {
  // reddit = new Reddit(redditConfig)
  // flairs = await reddit.get('/r/sittingonclouds/api/link_flair_v2')
}
if (redditConfig) {
  runReddit()
}

export const discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] })
if (discordToken) discordClient.login(discordToken).then(() => console.log(`Logged in as ${discordClient.user.tag}!`))

export async function postReddit (instance) {
  /* const classList = await instance.getCategories()
    const classItem = classList[0]

    const flair = classItem && flairs.find(f => f.text === classItem.name)

    if (reddit) {
      reddit.post('/api/submit', {
        sr: 'sittingonclouds',
        kind: 'link',
        title: instance.title,
        url: `https://www.sittingonclouds.org/album/${instance.id}`,
        flair_id: flair ? flair.id : '',
        flair_text: flair ? flair.text : ''
      }).catch(console.log)
    } */
}

export async function postDiscord (id) {
  if (discordToken) {
    const guild = await discordClient.guilds.fetch(process.env.GUILD)
    await guild.channels.fetch()

    guild.channels.cache
      .find(c => c.name === 'last-added-soundtracks')
      .send(`https://www.sittingonclouds.net/album/${id}`)
  }
}
