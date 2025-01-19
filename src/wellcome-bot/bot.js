const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const linkImg = 'https://media.discordapp.net/attachments/1277222154399780879/1277236419340800090/logo.png?ex=66cf119c&is=66cdc01c&hm=b53f674e186c987f04d207a70b42b9e7563ab4a86a7037a4cf269de3388b1e70&=&format=webp&quality=lossless&width=350&height=350';
const linkImgFooter = 'https://cdn.discordapp.com/attachments/1285193065111490581/1330627393857261770/wellcome.gif?ex=678eaad4&is=678d5954&hm=7f47087f0b9cfc782d88af0a171d78a84556664b89177e72fa528d7937b5f2d3&';
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

client.on('guildMemberAdd', async (member) => {
    try {
        // Tạo Embed chào mừng
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setAuthor({ name: 'WELCOME TO AMIGOS', iconURL: linkImg, url: 'https://discord.com/channels/1277045852803694643/1326906130303029299' })
            .setTitle(`Chào mừng 🎉${member.user.globalName}🎉 đến với server của chúng tôi!`)
            .setDescription(`Tôi biết rằng tin nhắn này sẽ không được hiển thị đầy đủ khi bạn chưa Verify!`)
            .addFields(
                {
                    name: 'Verify - Xác thực',
                    value:
                        `Tại đây bạn phải thực hiện Verify để có thể xem đầy đủ Server Amigos**\n` +
                        `https://discord.com/channels/1277045852803694643/1277618501670146068**`
                },
                {
                    name: 'Notification - Thông báo',
                    value:
                        `Đây là kênh thông báo chính của Server !!**\n` +
                        `https://discord.com/channels/1277045852803694643/1326906130303029299**`
                },
                {
                    name: 'Auto Buy - Chúng tôi có hệ thống bán hàng tự động',
                    value:
                        `Buy - Bạn có thể mua hàng tại đây**\n` +
                        `https://discord.com/channels/1277045852803694643/1277216495600013404**\n` +
                        `https://discord.com/channels/1277045852803694643/1277215966064934985**`
                },
                {
                    name: 'Support - Đội ngủ hỗ trợ của chúng tôi gần như hoạt động 24/7',
                    value:
                        `Creat a Ticket - Nếu bạn cần hỗ trợ**\n` +
                        `https://discord.com/channels/1277045852803694643/1277260337170747454**`
                },
                {
                    name: 'Flex',
                    value:
                        `Feedback - Vouch - Các đánh giá từ khách hàng**\n` +
                        `https://discord.com/channels/1277045852803694643/1277213893961318420**\n` +
                        `https://discord.com/channels/1277045852803694643/1278794375270240306**\n` +
                        `https://discord.com/channels/1277045852803694643/1310257176618602561**`
                },
                {
                    name: 'Product - Sản phẩm của chúng tôi',
                    value:
                        `Cheat**\n` +
                        `https://discord.com/channels/1277045852803694643/1295396194339520563**\n` +
                        `https://discord.com/channels/1277045852803694643/1330623612943601684**\n` +
                        `https://discord.com/channels/1277045852803694643/1280446667916709919**\n` +
                        `https://discord.com/channels/1277045852803694643/1321812233243856958**\n` +
                        `https://discord.com/channels/1277045852803694643/1316009211074838549**\n` +
                        `https://discord.com/channels/1277045852803694643/1327563642807255050**\n` +
                        `https://discord.com/channels/1277045852803694643/1286091018311176223**\n` +
                        `Swoofer (UNBAN) - Bypass**\n` +
                        `https://discord.com/channels/1277045852803694643/1292699014034231357**\n` +
                        `https://discord.com/channels/1277045852803694643/1277739580875083850**\n` +
                        `https://discord.com/channels/1277045852803694643/1318511037284352030**\n` +
                        `Orther Product**\n` +
                        `https://discord.com/channels/1277045852803694643/1318520167738642432**\n` +
                        `https://discord.com/channels/1277045852803694643/1318520072737652746**`
                },
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setImage(linkImgFooter)
            .setFooter({ text: 'Cảm ơn bạn đã tham gia!', iconURL: member.guild.iconURL() });

        // Gửi Embed qua DM
        await member.send({ embeds: [welcomeEmbed] });

        // Gửi thông báo thành công đến kênh cụ thể
        const notificationChannel = member.guild.channels.cache.get('1277222036132991077');
        if (notificationChannel) {
            notificationChannel.send(`✅ Đã gửi tin nhắn chào mừng đến **${member.user.tag}**-**${member.user.globalName}**-**${member.user.username}**qua DM.`);
        }
    } catch (err) {
        console.error('Không thể gửi tin nhắn:', err);
    }
});

// Đăng nhập bot Discord
client.login(BOT_TOKEN).then(() => {
    console.log("Bot đã đăng nhập thành công.");
}).catch((error) => {
    console.error("Lỗi khi đăng nhập bot:", error);
});
