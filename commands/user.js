const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment'); 
moment.locale('ru')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Дает информацию о пользователе'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Эта команда была использована \`${interaction.user.tag}\`\nДата Присоединения \`${moment(interaction.member.joinedAt).format('MMM DD YYYY, h:mm:ss')}\`.`);
	},
};