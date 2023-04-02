const {
    SlashCommandBuilder,
    PermissionsBitField,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-verify')
        .setDescription('setup-verify'),
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
            await interaction.reply({
                ephemeral: true,
                content: "Zpráva byla poslána",
            });
            const channelv = client.channels.cache.get('1076611802982518834');
            const embed = new EmbedBuilder()
                .setColor("#00ff00")
                .setTitle("Gaming Kingdom | Verify")
                .setDescription('Vítám tě, pro ověření klikni na tlačítko.')
                .setFooter({
                    text: 'Gaming Kingdom ©2023'
                });
            const Verifybutton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("button")
                .setEmoji("✅")
                .setLabel("Ověřit")
                .setStyle(ButtonStyle.Success)
            );
            await channelv.send({
                embeds: [embed],
                components: [Verifybutton]
        
            });
            const buttonCollector = await channelv.createMessageComponentCollector();
            buttonCollector.on('collect', async (y) => {
                const role = interaction.guild.roles.cache.get('1075499612787458149');
                const rolez = interaction.guild.roles.cache.get('1075495286035726467');
                await y.member.roles.add(role);
                await y.member.roles.add(rolez);
                return y.reply({
                    ephemeral: true,
                    content: "úspěšně ověřen.",
                }); 
            });
        }
    },
};