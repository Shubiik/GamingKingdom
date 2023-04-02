const {
    SlashCommandBuilder,
    ModalBuilder,
    PermissionsBitField,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev-log')
        .setDescription('dev-log text'),
    async execute(interaction, client) {
        if (
            !interaction.member.permissions.has(
                PermissionsBitField.Flags.Administrator
            )
        )
            return await interaction.reply({
                ephemeral: true,
                content: "Musíš mít větší práva na vyvolání příkazu",
            });
        else {
            const modal = new ModalBuilder()
                .setCustomId('devlog')
                .setTitle('Dev-Log');

            const textInput = new TextInputBuilder()
                .setCustomId('devlogInput')
                .setLabel("Napiš změny v devlogu")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));

            await interaction.showModal(modal);
        }
    },
};