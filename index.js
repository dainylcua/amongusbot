// Require discord.js for easy functionality
const { Client, Intents } = require('discord.js')
// Require dotenv to access environment variables
require('dotenv').config()

// Create a client instance with intents
// GUILDS in Discord represent a server
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

// When the client is ready, run code once
// Similar to useEffect() with an empty dependency array
client.once('ready', () => {
  console.log('Amongusbot ready for servsus!')
})

// Login to Discord with the token
client.login(process.env.CLIENT_TOKEN)