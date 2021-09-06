const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Prefix is !
const prefix = '!'

client.on('message', (msg) => {
  // Do nothing if prefix is not !
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    return
  }

  // Parse message
})

const TOKEN = require('./token')

client.login(TOKEN)
