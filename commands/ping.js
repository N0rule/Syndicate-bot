const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('пингует WebSocket!'),
		async execute(interaction) {
			const sent = await interaction.reply({ content: 'Пингую...', fetchReply: true });
			await interaction.editReply(`:ping_pong: Понг!\n:stopwatch: Аптайм: ${Math.round(interaction.client.uptime / 60000)} minutes\n:sparkling_heart: Сердцебиение ВебСокета: ${interaction.client.ws.ping}ms.\n:round_pushpin: Круговая задержка: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
		},
	};