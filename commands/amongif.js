// Handles /amongus

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('amongif')
    .setDescription('Replies with an amongus gif'),
  async execute(interaction) {
    await interaction.reply('Gif feature not implemented at the moment. Kinda sussy.')
  }
}