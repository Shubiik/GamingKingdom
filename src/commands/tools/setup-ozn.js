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
        .setName('setup-ozn')
        .setDescription('setup-ozn'),
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
            const channeli = client.channels.cache.get('1089186915955265618');
            const embed = new EmbedBuilder()
                .setColor("#ff7f50")
                .setTitle("Gaming Kingdom | Oznámení")
                .setDescription('Pro získávání stálých oznámení klikni pro získání role.')
                .setFooter({
                    text: 'Gaming Kingdom ©2023'
                });
            const oznbutton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("button")
                .setEmoji("🔔")
                .setLabel("Oznámení")
                .setStyle(ButtonStyle.Success)
            );
            await channeli.send({
                embeds: [embed],
                components: [oznbutton]
        
            });
            const buttonCollector = await channeli.createMessageComponentCollector();
            buttonCollector.on('collect', async (y) => {
                const role = interaction.guild.roles.cache.get('1075499367215153283');
                await y.member.roles.add(role);
                return y.reply({
                    ephemeral: true,
                    content: "úspěšně přidělena role Oznámení.",
                }); 
            });
        }
    },
};