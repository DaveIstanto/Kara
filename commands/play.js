const { SlashCommandBuilder } = require('@discordjs/builders')
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play Song!')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('Enter Song title')
        .setRequired(true),
    ),
  async execute(interaction) {
    // Get song title from argumen
    const songTitle = interaction.options.getString('title')

    // Setup audio player and channel
    const player = createAudioPlayer()
    const voiceChannel = interaction.member.voice.channel
    const connection = await connectToChannel(voiceChannel)
    connection.subscribe(player)
    await playSong(songTitle, player, interaction)
  },
}

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3)
    return connection
  } catch (error) {
    connection.destroy()
    throw error
  }
}

async function playSong(songTitle, player, interaction) {
  const stream = ytdl(songTitle, { filter: 'audioonly' })
  const resource = createAudioResource(stream, {
    inputType: StreamType.Arbitrary,
  })
  player.play(resource)
  player.on('error', (error) => {
    console.error(`Error: ${error}`)
  })

  interaction.reply(`now playing ${songTitle}`)
}
