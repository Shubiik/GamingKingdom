const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: {
        name: 'devlog'
    },
    async execute(interaction, client) {
        const channelg = client.channels.cache.get('1076190392015388722');
        const devlog = interaction.fields.getTextInputValue('devlogInput');
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`**🛠 Dev-Log 🛠**`)
            .addFields({
                name: " ",
                value: devlog,
                inline: true
              })
            .setFooter({
                text: 'Gaming Kingdom ©2023'
            });

        await channelg.send({
            embeds: [embed]
        });
        await interaction.reply({
            content: 'Zpráva byla odeslána',
            ephemeral: true
        });
    }
}