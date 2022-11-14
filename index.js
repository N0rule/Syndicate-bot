
console.log('-------- Loading Packages --------');
const fs = require('node:fs');
const path = require('node:path');
const {Client,Events,Collection,GatewayIntentBits,} = require ("discord.js")
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

client.commands = new Collection();

//command Hendler
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
//----------------------------------------------------------

//mongodb connect
    mongoose.connect(process.env.MONGO_URI ,{

    keepAlive: true
    }).then(console.log('--- M O N G O  C O N N E C T E D ---'));

//Executing commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
        //Error Text of any command
		await interaction.reply({ content: 'Ошибка обработки команды!', ephemeral: true });
	}
});


//adding string to mongodb
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
//--------------------------
//---------Here To Set The Activity Status---------\\

client.on("ready", async () => {
    console.log(`---------Powered By N0rule---------`)
    const Botdiscr = [
      'Люблю Котика',
      'Люблю Вовчика',
      'Люблю Богдана',
      'Люблю Лешу',
      'Дима Пидор',
    ];
    const status = [
        'dnd',
        'idle',
        'online'
      ];
setInterval(() => {
    client.user.setPresence({ activities: [{ name: Botdiscr[Math.floor(Math.random() * Botdiscr.length)] }], status: status[Math.floor(Math.random() * status.length)] });
}, 15000)

  });
  //---------End--------\\
  console.log(`---------Успешно Запущенно---------`);
client.login(process.env.TOKEN);