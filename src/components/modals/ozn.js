const {
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: {
        name: 'ozn'
    },
    async execute(interaction, client) {
        const channelg = client.channels.cache.get('1075496840914534510');
        const devlog = interaction.fields.getTextInputValue('oznInput');
        const embed = new EmbedBuilder()
            .setColor('#ff7f50')
            .setTitle(`**📢 Oznámení 📢**`)
            .addFields({
                name: " ",
                value: devlog,
                inline: true
            })
            .setFooter({
                text: 'Gaming Kingdom ©2023'
            });

        await channelg.send({
            embeds: [embed],
            content: '[||<@&1075499367215153283>||]'
        });
        await interaction.reply({
            content: 'Zpráva byla odeslána',
            ephemeral: true
        });
    }
}