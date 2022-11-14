const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Удалите до 99 сообщений')
		.addIntegerOption(option => 
            option.setName('amount')
			.setNameLocalizations({
				ru: 'количество',
			})
            .setDescription('Количество Сообщений')),

	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		if (amount < 1 || amount > 99) {
			return interaction.reply({ content: 'Введите количество сообщений от 1 до 99', ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Ошибка очистки в этом канале!', ephemeral: true });
		});
		console.log(`[Очистка] ${interaction.user.tag} удалил ${amount} сообщений!`);
		return interaction.reply({ content: `Успешно удалено \`${amount}\` сообщений.`, ephemeral: true });

	},
};