const { SlashCommandBuilder } = require('@discordjs/builders')

const imgLinks = [
  'https://imgur.com/r/motivation/2jYZxXe',
  'https://imgur.com/r/motivation/GBgYjGk',
  'https://imgur.com/r/motivation/8gshh5u',
  'https://imgur.com/r/motivation/7Dy9hG7',
  'https://imgur.com/r/motivation/Vfn7vgY',
  'https://imgur.com/r/motivation/mPLHRP2',
  'https://imgur.com/r/motivation/VIxAA8g',
  'https://imgur.com/r/motivation/v0zWxpR',
  'https://imgur.com/gallery/l6IEgu2',
]
module.exports = {
  data: new SlashCommandBuilder()
    .setName('cringequoteroulette')
    .setDescription('Compilation of cringe quote roulettes'),
  async execute(interaction) {
    const cIdx = Math.floor(Math.random() * imgLinks.length)
    await interaction.reply(imgLinks[cIdx])
  },
}
