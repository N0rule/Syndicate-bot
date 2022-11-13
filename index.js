const {Client,GatewayIntentBits, messageLink} = require ("discord.js")
require("dotenv/config")

const client = new Client({
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
],
})

client.on('ready', () => {
    console.log('Бот Готов к роботе')
})

client.on('messageCreate', (message) => {

    if (message.content === 'ping') {
        message.reply ('pong')
    }
})

client.login(process.env.TOKEN)