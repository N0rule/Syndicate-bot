const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Отвечает на запрос понгом!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};