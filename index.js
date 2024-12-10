const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Webhook URL Discord của bạn
const discordWebhookUrl =
    "https://discord.com/api/webhooks/1316048104314900583/dLU83jhlRqbC2hZmBubg7ZKl9ieSncEQjvKPH9__7hBkj25yIXK8OopIC61VHU_g12MS";

// Middleware để parse JSON
app.use(bodyParser.json());

// Lắng nghe Webhook từ bên ngoài
app.post("/webhook", async (req, res) => {
    try {
        const data = req.body;

        console.log("Dữ liệu nhận từ Webhook:", data);

        // Tạo nội dung thông báo cho Discord
        const message = {
            content: `**Thông báo giao dịch từ ${data.gateway || "ngân hàng"}**\n` +
                `**Ngày giao dịch**: ${data.transactionDate || "N/A"}\n` +
                `**Số tài khoản**: ${data.accountNumber || "N/A"}\n` +
                `**Nội dung giao dịch**: ${data.content || "N/A"}\n` +
                `**Số tiền giao dịch**: ${(data.transferAmount || 0).toLocaleString()} VND\n` +
                `**Loại giao dịch**: ${data.transferType || "N/A"}\n` +
                `**Mã tham chiếu**: ${data.referenceCode || "N/A"}\n` +
                `**Mô tả**: ${data.description || "N/A"}`
        };

        // Gửi thông báo đến Discord Webhook
        await axios.post(discordWebhookUrl, message);
        console.log("Gửi thông báo thành công đến Discord.");

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
