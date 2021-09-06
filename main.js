const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js')
const { token } = require('./config.json')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

// Setup commands collection, get all .js file from ./commands directory
client.commands = new Collection()
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command)
}

client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  if (commandName === 'ping') {
    await interaction.reply('Pong!')
  } else if (commandName === 'server') {
    await interaction.reply('Server info.')
  } else if (commandName === 'user') {
    await interaction.reply('User info.')
  }
})

client.login(token)
