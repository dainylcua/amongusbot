// Requires the file system module
const fs = require('fs')
// Require discord.js classes for easy functionality
const { Client, Collection, Intents } = require('discord.js')
// Require dotenv to access environment variables
require('dotenv').config()

// Import fetch
import('node-fetch')

// Create a client instance with intents
// GUILDS in Discord represent a server
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

// Gets all events, similar to commandFiles
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// Allows the commands to be a new Collection Class and can bve accessed in other files
client.commands = new Collection()

// Read commands that end with .js
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))

// Reads each file in the commandFiles array
//// For every file, makes a command
for (file of commandFiles) {
  const command = require(`./commands/${file}`)
  // Sets a new item in the collection
  // Key = command name, value = exported module (all the data)
  client.commands.set(command.data.name, command)
}

// When the client is ready, run code once
// Similar to useEffect() with an empty dependency array
client.once('ready', () => {
  console.log('Amongusbot ready for servsus!')
})

client.on('interactionCreate', async (interaction) => {
  // If interaction is not a command, stop
  if (!interaction.isCommand()) return

  // Gets command name from the interaction
  const command = client.commands.get(interaction.commandName)

  // If not a valid command, return
  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing the command', ephemeral: true })
  }
})

// Login to Discord with the token
client.login(process.env.CLIENT_TOKEN)