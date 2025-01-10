const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Token của bot Discord
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = "1327256693482061824"; // Thay bằng ID của kênh cần gửi thông báo

// Tạo bot Discord
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Middleware để parse JSON
app.use(bodyParser.json());

// Lắng nghe Webhook từ bên ngoài
app.post("/webhook", async (req, res) => {
    try {
        const data = req.body;

        console.log("Dữ liệu nhận từ Webhook:", data);

        // Tạo nội dung thông báo cho Discord
        const messageContent = `**Thông báo giao dịch từ ${data.gateway || "ngân hàng"}**\n` +
            `**Ngày giao dịch**: ${data.transactionDate || "N/A"}\n` +
            `**Số tài khoản**: ${data.accountNumber || "N/A"}\n` +
            `**Nội dung giao dịch**: ${data.content || "N/A"}\n` +
            `**Số tiền giao dịch**: ${(data.transferAmount || 0).toLocaleString()} VND\n` +
            `**Loại giao dịch**: ${data.transferType || "N/A"}\n` +
            `**Mã tham chiếu**: ${data.referenceCode || "N/A"}\n` +
            `**Mô tả**: ${data.description || "N/A"}`;

        // Gửi thông báo đến kênh Discord
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (channel && channel.isTextBased()) {
            await channel.send(messageContent);
            console.log("Gửi thông báo thành công đến kênh Discord.");
        } else {
            console.error("Không tìm thấy kênh hoặc kênh không hỗ trợ gửi tin nhắn.");
        }

        // Phản hồi thành công
        res.status(200).send("Webhook received and notification sent!");
    } catch (error) {
        console.error("Lỗi khi xử lý Webhook:", error);
        res.status(500).send("Error processing Webhook.");
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});

// Đăng nhập bot Discord
client.login(BOT_TOKEN).then(() => {
    console.log("Bot đã đăng nhập thành công.");
}).catch((error) => {
    console.error("Lỗi khi đăng nhập bot:", error);
});
