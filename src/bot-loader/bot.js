const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const linkImg = 'https://media.discordapp.net/attachments/1277222154399780879/1277236419340800090/logo.png?ex=66cf119c&is=66cdc01c&hm=b53f674e186c987f04d207a70b42b9e7563ab4a86a7037a4cf269de3388b1e70&=&format=webp&quality=lossless&width=350&height=350'; // Thay bằng link ảnh của bạn

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const requiredRoleIds = ['1277131467130146886', '1277260852541526056', '1294218721107378207', '1326398921865560085']; // Thay ANOTHER_ROLE_ID bằng ID vai trò mới

client.once('ready', () => {
    console.log(`${client.user.tag} đã sẵn sàng!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!full') {

        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Nhân viên!');
            return;
        }
        
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Amigos Loader')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Loader Full`,
                        value: "[Link loader Amigos Full](https://mega.nz/file/PAt1wJ4K#B2KkuUBSysehJw3uQXLrzXQ6cyTGvpz5xi5zNaO9brs)",
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
    if (message.content === '!vip') {

        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Nhân viên!');
            return;
        }
        
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Amigos Loader')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Loader Vip`,
                        value: "[Link loader Amigos Vip](https://mega.nz/file/nI9ARBzD#8deYuzRP6o30jCirD7k_IYPxq3CNQWH7EaogNx4xtK4)",
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
    if (message.content === '!unlock') {

        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Nhân viên!');
            return;
        }
        
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Amigos Loader')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Loader Unlock All`,
                        value: "[Link loader Amigos Unlock All](https://mega.nz/file/aNNwCKrD#5qpNffczmcJQCpAPeePx2BxQzluLOnpY7jXAJT9Q5WA)",
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
    if (message.content === '!standart') {

        const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

        if (!hasRequiredRole) {
            await message.reply('Bạn không phải Nhân viên!');
            return;
        }
        
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Amigos Loader')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: "AMIGOS",
                    iconURL: linkImg,
                    url: "https://discord.com/channels/1277045852803694643/1326906130303029299",
                })
                .addFields(
                    {
                        name: `Loader Standart`,
                        value: "[Link loader Amigos Standart](https://mega.nz/file/PE8xRAiT#XN_aMbE9RM7pS-4G_ApGQCpf7WbJipIAckhu8hh_-x8)",
                    },
                )
                .setTimestamp()
                .setFooter({
                    text: "BOT được phát triển bởi AMIGOS",
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
            await message.reply('Đã xảy ra lỗi khi xử lý giao dịch của bạn.');
        }
    }
});

client.login(BOT_TOKEN).catch(error => {
    console.error(`Error logging in: ${error.message}`);
});
