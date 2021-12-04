// Handles /amongus
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('amongif')
    .setDescription('Replies with an amongus gif'),
  async execute(interaction) {
    const offset = Math.floor(Math.random() * (15 + 1))
    const res = await fetch(`${GIPHY_URL}?api_key=${process.env.GIPHY_KEY}&q=amogus&limit=1&offset=${offset}`)
    const data = await res.json()
    await interaction.reply(data.data[0].images.downsized.url)
  }
}