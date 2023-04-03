const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        client.user.setActivity('Minecraft', { type: ActivityType.Playing });
        console.log(`Připraven!! ${client.user.username} is logged in and online!`);
    }
}

// auto mod - mazaní odkazu u rolí wl a non wl + duvod smazani