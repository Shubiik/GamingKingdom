const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("tadd")
        .setDescription("ticket add user")
        .addUserOption((option) =>
            option
            .setName("hrac")
            .setDescription("The user mentioned")
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const channel = interaction.channel;
        const member = interaction.options.getMember("hrac")
        channel.permissionOverwrites.edit(member.user.id, {
            ViewChannel: true,
            SendMessages: true,
        });
        const name = channel.name;

        const channelID = '1076927763635781774';
        const mChannel = channel.guild.channels.cache.get(channelID);

        const embedt = new EmbedBuilder()
            .setColor('Red')
            .setTitle('přidání na tiket')
            .addFields({
                name: 'Název místnosti',
                value: `${name}`,
                inline: false
            })
            .addFields({
                name: 'přidaný hráč',
                value: `${member.user}`,
                inline: true
            })
            .setTimestamp()
            .setFooter({
                text: 'Gaming Kingdom ©2023'
            })

        mChannel.send({
            embeds: [embedt]
        })
        interaction.reply({
            content: "Hráč úspěšně přidán",
            ephemeral: true
        })
    }
};