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
        .setName('oznameni')
        .setDescription('oznameni text'),
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
                .setCustomId('ozn')
                .setTitle('Oznámení');

            const textInput = new TextInputBuilder()
                .setCustomId('oznInput')
                .setLabel("Napiš oznámení pro server")
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);

            modal.addComponents(new ActionRowBuilder().addComponents(textInput));

            await interaction.showModal(modal);
        }
    },
};