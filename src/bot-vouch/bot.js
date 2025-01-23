const { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN_VOUCH;

const VOUCH_CHANNEL_ID = '1331826874720194670';  // ID của kênh vouch
let vouchMessageId = null;  // Biến lưu ID tin nhắn vouch của bot

client.once('ready', async () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const vouchChannel = await client.channels.fetch(VOUCH_CHANNEL_ID);

    try {
        if (vouchMessageId) {
            const oldVouchMessage = await vouchChannel.messages.fetch(vouchMessageId);
            if (oldVouchMessage) {
                await oldVouchMessage.delete();
            }
        }

        const vouchButton = new ButtonBuilder()
            .setCustomId('vouch_button')
            .setLabel('Vouch')
            .setStyle(ButtonStyle.Primary);

        const actionRow = new ActionRowBuilder().addComponents(vouchButton);

        const sentMessage = await vouchChannel.send({
            content: 'Hãy bấm vào nút dưới đây để vouch!',
            components: [actionRow],
        });

        vouchMessageId = sentMessage.id;

    } catch (error) {
        console.error('Error sending vouch button:', error);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton() && interaction.customId === 'vouch_button') {
        try {
            const modal = new ModalBuilder()
                .setCustomId('vouchModal')
                .setTitle('Vouch Form');

            // Trường đánh giá sao 1
            const ratingInput1 = new TextInputBuilder()
                .setCustomId('rating1')
                .setLabel('Đánh giá sao (1-5 sao)')
                .setStyle(TextInputStyle.Short)
                .setMinLength(1)
                .setMaxLength(1)
                .setRequired(true);

            // Trường đánh giá sao 2
            const ratingInput2 = new TextInputBuilder()
                .setCustomId('rating2')
                .setLabel('Đánh giá bổ sung')
                .setStyle(TextInputStyle.Paragraph)
                .setMinLength(1)
                .setMaxLength(300)
                .setRequired(true);

            // Tạo các hàng để chứa các trường nhập liệu
            const firstActionRow = new ActionRowBuilder().addComponents(ratingInput1);
            const secondActionRow = new ActionRowBuilder().addComponents(ratingInput2);

            // Thêm các trường vào modal
            modal.addComponents(firstActionRow, secondActionRow);

            await interaction.showModal(modal);
        } catch (error) {
            console.error('Error sending modal:', error);
            await interaction.reply({
                content: 'Đã xảy ra lỗi khi gửi form vouch.',
                ephemeral: true,
            });
        }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'vouchModal') {
        try {
            const rating1 = interaction.fields.getTextInputValue('rating1');
            const rating2 = interaction.fields.getTextInputValue('rating2');

            if (!rating1 || !rating2) {
                return interaction.reply({ content: 'Vui lòng cung cấp đầy đủ thông tin!', ephemeral: true });
            }

            // Gửi yêu cầu người dùng tải ảnh lên sau khi submit modal
            await interaction.reply({
                content: 'Cảm ơn bạn đã gửi đánh giá! Vui lòng tải lên hình ảnh vouch trong tin nhắn này.',
                ephemeral: true
            });

            // Lắng nghe tin nhắn tiếp theo có đính kèm ảnh
            const filter = (response) => response.author.id === interaction.user.id && response.attachments.size > 0;
            const collected = await interaction.channel.awaitMessages({
                filter,
                max: 1,
                time: 60000,
                errors: ['time']
            });

            const imageUrl = collected.first().attachments.first().url;

            // Gửi tin nhắn xác nhận
            await interaction.followUp({
                content: `Cảm ơn bạn đã tải lên hình ảnh vouch! Hình ảnh: ${imageUrl}`,
                ephemeral: true
            });

            // Gửi ảnh vào kênh vouch
            const vouchChannel = await interaction.guild.channels.fetch(VOUCH_CHANNEL_ID);
            const embed = {
                color: 0x0099ff,
                title: 'Vouch Mới',
                description: `Người dùng **${interaction.user.username}** đã vouch với đánh giá **${rating1}** sao\n **${rating2}**.\n Hình ảnh:\n`,
                image: { url: imageUrl },
                timestamp: new Date(),
            };

            const sentEmbedMessage = await vouchChannel.send({ embeds: [embed] });

            // Xóa ảnh người dùng đã gửi lên sau khi bot đã sử dụng
            await collected.first().delete();

            // Đợi 5 giây và gửi lại nút Vouch
            setTimeout(async () => {
                const vouchButton = new ButtonBuilder()
                    .setCustomId('vouch_button')
                    .setLabel('Vouch')
                    .setStyle(ButtonStyle.Primary);

                const actionRow = new ActionRowBuilder().addComponents(vouchButton);

                const vouchChannel = await client.channels.fetch(VOUCH_CHANNEL_ID);
                const sentMessage = await vouchChannel.send({
                    content: 'Hãy bấm vào nút dưới đây để vouch!',
                    components: [actionRow],
                });

                vouchMessageId = sentMessage.id;
            }, 5000); // Đợi 5 giây trước khi gửi nút

        } catch (error) {
            console.error('Error handling modal submit:', error);
            await interaction.reply({ content: 'Đã xảy ra lỗi khi gửi thông tin vouch. Vui lòng thử lại!', ephemeral: true });
        }
    }
});



client.login(BOT_TOKEN);