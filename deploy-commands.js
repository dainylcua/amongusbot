//// THIS FILE DEPLOYS CREATED COMMANDS - MUST RUN BEFORE ADDING OR EDITING COMMANDS

// Sets up file system module
const fs = require('fs')
// REST allows REST api calls
const { REST } = require('@discordjs/rest')
// Routes allows for routing into the discord api
const { Routes } = require('discord-api-types/v9')
// Require dotenv to access environment variables
require('dotenv').config()

// Reads all command files that end with .js
const commands = []
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))

// For every file, push data into the commands away
for (file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN)
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
  .then(() => console.log('Succesfully registered commands.'))
  .catch(console.error)