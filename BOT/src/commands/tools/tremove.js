const {
    SlashCommandBuilder,
    PermissionsBitField
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("tremove")
        .setDescription("ticket remove user")
        .addUserOption((option) =>
            option
            .setName("hrac")
            .setDescription("The user mentioned")
            .setRequired(true)
        ),
    async execute(interaction, client) {
        if (
            !interaction.member.permissions.has(
                PermissionsBitField.Flags.UseApplicationCommands
            )
        )
            return await interaction.reply({
                ephemeral: true,
                content: "Musíš mít větší práva na vyvolání příkazu",
            });
        else {
            const channel = interaction.channel;
            const member = interaction.options.getMember("hrac")
            channel.permissionOverwrites.edit(member.user.id, {
                ViewChannel: false,
                SendMessages: false,
            });
            interaction.reply({
                content: "Hráč úspěšně odebrán",
                ephemeral: true
            })
        }
    }
};