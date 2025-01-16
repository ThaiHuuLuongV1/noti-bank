const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const linkImg = 'https://media.discordapp.net/attachments/1277222154399780879/1277236419340800090/logo.png?ex=66cf119c&is=66cdc01c&hm=b53f674e186c987f04d207a70b42b9e7563ab4a86a7037a4cf269de3388b1e70&=&format=webp&quality=lossless&width=350&height=350'; // Thay bằng link ảnh của bạn

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

const { connectDB } = require('../database/database.js');
const { KeyCheat } = require('../database/KeyCheat.js');

connectDB();

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const requiredRoleIds = ['1277131467130146886', '1294218721107378207', '1277590756101586944']; // Thay bằng ID vai trò cần thiết

client.once('ready', () => {
    console.log(`${client.user.tag} đã sẵn sàng!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!account') {
        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Streamer!');
            return;
        }

        try {
            const existingKeyCheat = await KeyCheat.findOne({
                KeyCheatType: "account_live",
                time: "1D",
                status: false,
            });

            if (!existingKeyCheat) {
                await message.reply('Không tìm thấy tài khoản phù hợp.');
                return;
            }

            // Gửi tin nhắn riêng (DM)
            const dmChannel = await message.author.createDM();
            await dmChannel.send(`Thông tin tài khoản của bạn: ${existingKeyCheat.key}`);

            // Cập nhật trạng thái KeyCheat
            existingKeyCheat.status = true;
            existingKeyCheat.usedAt = new Date();
            existingKeyCheat.usedUser = message.author.username;
            existingKeyCheat.usedUserId = message.author.id;
            await existingKeyCheat.save();

            // Gửi phản hồi trong kênh
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('AMIGOS')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Account Manager`,
                        value: `Đã gửi tài khoản qua tin nhắn riêng cho ${message.author.tag}.`,
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg,
                });

            await message.reply({
                content: `<@784333596805955604>`, // Tag bạn
                embeds: [embed],
            });
        } catch (error) {
            console.error('Lỗi khi xử lý giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
    if (message.content === '!accountvip') {
        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Streamer!');
            return;
        }

        try {
            const existingKeyCheat = await KeyCheat.findOne({
                KeyCheatType: "account_live",
                time: "1W",
                status: false,
            });

            if (!existingKeyCheat) {
                await message.reply('Không tìm thấy tài khoản phù hợp.');
                return;
            }

            // Gửi tin nhắn riêng (DM)
            const dmChannel = await message.author.createDM();
            await dmChannel.send(`Thông tin tài khoản của bạn: ${existingKeyCheat.key}`);

            // Cập nhật trạng thái KeyCheat
            existingKeyCheat.status = true;
            existingKeyCheat.usedAt = new Date();
            existingKeyCheat.usedUser = message.author.username;
            existingKeyCheat.usedUserId = message.author.id;
            await existingKeyCheat.save();

            // Gửi phản hồi trong kênh
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('AMIGOS')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Account Manager`,
                        value: `Đã gửi tài khoản qua tin nhắn riêng cho ${message.author.tag}.`,
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg,
                });

            await message.reply({
                content: `<@784333596805955604>`, // Tag bạn
                embeds: [embed],
            });
        } catch (error) {
            console.error('Lỗi khi xử lý giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
});

client.login(BOT_TOKEN).catch(error => {
    console.error(`Error logging in: ${error.message}`);
});
