// Handles /amongus
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

const TENOR_URL = 'https://g.tenor.com/v1/search'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('amongif')
    .setDescription('Replies with an amongus gif'),
  async execute(interaction) {
    const pos = Math.floor(Math.random() * (15 + 1))
    const res = await fetch(`${TENOR_URL}?api_key=${process.env.TENOR_KEY}&q=amogus&limit=1&pos=${pos}`)
    const data = await res.json()
    await interaction.reply(data.results[0].media[0].gif.url)
  }
}