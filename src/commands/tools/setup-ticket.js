const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    Events,
    StringSelectMenuBuilder,
    ButtonInteraction,
    PermissionsField,
    PermissionsBitField,
    AttachmentBuilder,
} = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-ticket")
        .setDescription("vytvoření zadosti o tiket"),
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
        }
        //vytvoření menu
        const channelb = client.channels.cache.get('1076610726438912151');
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('nic nevybráno')
                .addOptions([{
                        label: 'Otázka',
                        emoji: '❓',
                        description: 'Pro zprávu o pomoc.',
                        value: 'otazka',
                    },
                    {
                        label: 'Nahlášení bugů',
                        emoji: '🐞',
                        description: 'Pro nahlášení chyb.',
                        value: 'bug',
                    },
                    {
                        label: 'Problémy s VIP',
                        emoji: '💬',
                        description: 'Pro nahlášení problému s VIP.',
                        value: 'vip',
                    },
                    {
                        label: 'Nahlášení Hráče',
                        emoji: '🙍‍♂️',
                        description: 'Pro nahlášení hráče',
                        value: 'nahlaseni',
                    },
                    {
                        label: 'Nábor da AT',
                        emoji: '🏢',
                        description: 'Pro nábor do A-Teamu.',
                        value: 'at',
                    },
                    {
                        label: 'Speciální požadavky',
                        emoji: '🪔',
                        description: 'Pro speciální požadavek.',
                        value: 'special',
                    },
                ]),
            );
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Gaming Kingdom - Tikety")
            .setDescription(`Jsme zvědavi, co Tě zavádí až sem 🙂. Proto neváhej vytvořit ticket. Jen před vytvořením ticketu prosím vyber správnou kategorii.`)
            .addFields({
                name: "__Otázka__",
                value: "Univerzální ticket, v případě jakéhokoliv problému, např. ztráta itemů, atd. ...",
                inline: false
            }, {
                name: "__Bugy/Chyby__",
                value: "Pro nahlašování chyb/bugů na mapě či pluginů.",
                inline: false
            }, {
                name: "__Problémy s VIP__",
                value: "Pro nahlašování problémů s VIP.",
                inline: false
            }, {
                name: "__Nahlášení hráče__",
                value: "Pro nahlašování hráčů, kteří podvádí.",
                inline: false
            }, {
                name: "__Nábor da AT__",
                value: "Pro pokus o nábor do AT.",
                inline: false
            }, {
                name: "__Speciální požadavky__",
                value: "Pro speciální požadavky od AT",
                inline: false
            })
            .setFooter({
                text: 'Gaming Kingdom ©2023'
            });
        await channelb.send({
            embeds: [embed],
            components: [row]
        });
        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on("collect", async (i) => {
            await i.update({
                embeds: [embed],
                components: [row]
            });
            //vytvoření místnosti - nedoděláné
            const channel = await interaction.guild.channels.create({
                name: `${i.values[0]} - ${i.user.username}`,
                type: ChannelType.GuildText,
                parent: "1089184586933731458",
            });

            channel.permissionOverwrites.create(i.user.id, {
                ViewChannel: true,
                SendMessages: true,
            });
            channel.permissionOverwrites.create(channel.guild.roles.everyone, {
                ViewChannel: false,
                SendMessages: false,
            });
            const name = channel.name;
            const id = channel.id;

            const channelID = '1076927763635781774';
            const mChannel = channel.guild.channels.cache.get(channelID);

            const embedt = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Tiket vytvořen')
                .addFields({
                    name: 'Název místnosti',
                    value: `${name} (<#${id}>)`,
                    inline: false
                })
                .addFields({
                    name: 'Typ Ticketu',
                    value: `${i.values[0]}`,
                    inline: false
                })
                .addFields({
                    name: 'Vytvořil',
                    value: `${i.user}`,
                    inline: false
                })
                .setTimestamp()
                .setFooter({
                    text: 'Gaming Kingdom ©2023'
                })

            mChannel.send({
                embeds: [embedt]
            })

            // Tlacítko uzavření - redirect na jiny server

            const Closebutton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("button")
                .setEmoji("⛔")
                .setLabel("Zavřít")
                .setStyle(ButtonStyle.Danger)
            );

            // jednotlivé tikety vzor
            if (i.values[0] == "otazka") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. Zeptej se na co potřebuješ`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            } else if (i.values[0] == "bug") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. zdel frakci`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            } else if (i.values[0] == "vip") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. Zděl nám chybu`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            } else if (i.values[0] == "nahlaseni") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. Zděl nám chybu`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            } else if (i.values[0] == "at") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. Zděl nám chybu`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            } else if (i.values[0] == "special") {
                const embeded = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Nový tiket vytvořen')
                    .setDescription(`Tvůj tiket byl vytvočen. Zděl nám chybu`);
                await channel.send({
                    content: `${i.user}`,
                    embeds: [embeded],
                    components: [Closebutton]
                });
            }
            const buttonCollector = await channel.createMessageComponentCollector();
            buttonCollector.on('collect', async (y) => {

                await channel.delete();
                const embedh = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Tiket uzavřen')
                    .addFields({
                        name: 'Název místnosti',
                        value: `${name}`,
                        inline: false
                    })
                    .addFields({
                        name: 'Stav Ticketu',
                        value: `uzavřen`,
                        inline: false
                    })
                    .addFields({
                        name: 'Vytvořil',
                        value: `${i.user}`,
                        inline: true
                    })
                    .addFields({
                        name: 'Uzavřel',
                        value: `${y.user}`,
                        inline: true
                    })
                    .setTimestamp()
                    .setFooter({
                        text: 'Gaming Kingdom ©2023'
                    })

                mChannel.send({
                    embeds: [embedh]
                })

                buttonCollector.stop();
            });

        });
    },
};