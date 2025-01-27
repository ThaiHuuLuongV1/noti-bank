const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Token và ảnh biểu tượng
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const linkImg = 'https://media.discordapp.net/attachments/1277222154399780879/1277236419340800090/logo.png?ex=66cf119c&is=66cdc01c&hm=b53f674e186c987f04d207a70b42b9e7563ab4a86a7037a4cf269de3388b1e70&=&format=webp&quality=lossless&width=350&height=350';

// ID vai trò yêu cầu
const requiredRoleIds = ['1277131467130146886', '1277260852541526056', '1294218721107378207', '1326398921865560085'];

// Các lệnh và thông tin liên kết
const commands = {
    '!full': { name: 'Loader Full', url: 'https://mega.nz/file/PAt1wJ4K#B2KkuUBSysehJw3uQXLrzXQ6cyTGvpz5xi5zNaO9brs' },
    '!vip': { name: 'Loader Vip', url: 'https://mega.nz/file/GUdRnTDa#asgqc54GHZvlFraVb5G-AR9DBebr5FMFsRhVvuHRC4A' },
    '!onlyaim': { name: 'Loader Only Aim', url: 'https://mega.nz/file/Xd1TSByY#uT7MIOpBaIGb6cmv-SWojD20bT43G6lQPYGtWetOqPM' },
    '!vipnew': { name: 'Loader Vip New', url: 'https://mega.nz/file/3IUyHDpa#cBO31k5vpPVdOCuVIhDMSQzL05fuw7UF_xdQFWH4-Uw' },
    '!unlock': { name: 'Loader Unlock All', url: 'https://mega.nz/file/aNNwCKrD#5qpNffczmcJQCpAPeePx2BxQzluLOnpY7jXAJT9Q5WA' },
    '!standart': { name: 'Loader Standart', url: 'https://mega.nz/file/jYlnBbQJ#0tPsLRUvcEvJ-ScGfsOEJ4gZB-p-RH-jVWM9iSajkOo' }
};

// Tạo client bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Hàm tạo mã giao dịch ngẫu nhiên
const generateTransactionCode = () => {
    const code = "qramigos";
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${code}${randomString}`;
};


// Hàm định dạng số tiền
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Khi bot sẵn sàng
client.once('ready', () => {
    console.log(`${client.user.tag} đã sẵn sàng!`);
});

// Xử lý khi nhận tin nhắn
client.on('messageCreate', async (message) => {
    const content = message.content;

    // Kiểm tra quyền
    const hasRequiredRole = requiredRoleIds.some(roleId => message.member.roles.cache.has(roleId));

    if (!hasRequiredRole && Object.keys(commands).includes(content)) {
        await message.reply('Bạn không phải Nhân viên!');
        return;
    }

    try {
        // Xử lý các lệnh loader
        if (commands[content]) {
            const command = commands[content];
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Amigos Loader')
                .setThumbnail(linkImg)
                .setAuthor({
                    name: 'AMIGOS',
                    iconURL: linkImg,
                    url: 'https://discord.com/channels/1277045852803694643/1326906130303029299'
                })
                .addFields(
                    { name: command.name, value: `[Link ${command.name}](${command.url})` }
                )
                .setTimestamp()
                .setFooter({
                    text: 'BOT được phát triển bởi AMIGOS',
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });
        }

        // Xử lý lệnh QR: !qr hoặc !qr<giá tiền>
        else if (content.startsWith('!qr')) {
            const price = parseInt(content.replace('!qr', '').trim(), 10) || 0;

            if (price <= 0) {
                await message.reply('Vui lòng nhập số tiền hợp lệ (ví dụ: `!qr50000`).');
                return;
            }

            const transactionCode = generateTransactionCode();
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Thông tin chuyển khoản')
                .addFields(
                    { name: 'Ngân hàng', value: '\n```MBBANK```', inline: true },
                    { name: 'Số tài khoản', value: '\n```0349339279```', inline: true },
                    { name: 'Chủ tài khoản', value: '\n```Nguyễn Đức Tiến```', inline: true },
                    { name: 'Số tiền', value: `\n\`\`\`${formatCurrency(price)}\`\`\``, inline: true },
                    { name: 'Nội dung chuyển khoản', value: `\n\`\`\`${transactionCode}\`\`\`` }
                )
                .setImage(`https://qrcode.io.vn/api/generate/970422/0349339279/${price}/${transactionCode}?frame=1`)
                .setTimestamp()
                .setFooter({
                    text: 'LƯU Ý NỘI DUNG CHUYỂN KHOẢN !!!',
                    iconURL: linkImg
                });

            await message.reply({ embeds: [embed] });
        }

    } catch (error) {
        console.error('Lỗi khi xử lý lệnh:', error);
        await message.reply('Đã xảy ra lỗi khi xử lý lệnh của bạn.');
    }
});

// Đăng nhập bot
client.login(BOT_TOKEN).catch(error => {
    console.error(`Lỗi đăng nhập: ${error.message}`);
});
