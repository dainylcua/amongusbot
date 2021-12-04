// Handles /amongus

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('amongus')
    .setDescription('Replies with Sus!'),
  async execute(interaction) {
    await interaction.reply('Sus!')
  }
}