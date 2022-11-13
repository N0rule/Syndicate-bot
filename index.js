const {Client,GatewayIntentBits, } = require ("discord.js")
const { default: mongoose } = require("mongoose")
const mangoose = require("mongoose")
require("dotenv/config")

const messageCountSchema = require("./message-count-schema")

const client = new Client({
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
],
});

client.on('ready', () => {
    console.log('Бот Готов к роботе')

    mongoose.connect(process.env.MONGO_URI ,{

    keepAlive: true
    });
});

client.on('messageCreate', async (message) => {
        await messageCountSchema.findOneAndUpdate({
            _id: message.author.id
            
        }, {
            
            username:message.author.tag,
            ServerJoinDate:message.member.joinedAt,
            is_bot:message.author.bot,
            _id: message.author.id,
            $inc: {
                messageCount: 1,
            },
        }, {
            upsert: true
        },
        )
});

client.on('messageCreate', (message) => {

    if (message.content === 'ping') {
        message.reply ('pong')
    }
});
client.login(process.env.TOKEN);