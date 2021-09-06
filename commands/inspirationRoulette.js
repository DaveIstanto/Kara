const { SlashCommandBuilder } = require('@discordjs/builders')

const imgLinks = [
  'https://imgur.com/a/wKFeE5x',
  'https://imgur.com/a/YLr0cEM',
  'https://imgur.com/a/ISlKYMn',
  'https://imgur.com/a/vnRLCVm',
]
module.exports = {
  data: new SlashCommandBuilder()
    .setName('inspirationroulette')
    .setDescription("Compilation of Josh's top inspiration quotes"),
  async execute(interaction) {
    const cIdx = Math.floor(Math.random() * imgLinks.length)
    await interaction.reply(imgLinks[cIdx])
  },
}
