const axios = require('axios');

// Webhook URL Discord của bạn
const webhookUrl = "https://discord.com/api/webhooks/1316048104314900583/dLU83jhlRqbC2hZmBubg7ZKl9ieSncEQjvKPH9__7hBkj25yIXK8OopIC61VHU_g12MS";

// Dữ liệu mà bạn muốn gửi
const data = {
    gateway: "MBBank",
    transactionDate: "2024-12-10 21:16:45",
    accountNumber: "0349339279",
    subAccount: null,
    code: null,
    content: "qramigosjilxug",
    transferType: "in",
    description: "BankAPINotify qramigosjilxug",
    transferAmount: 3000000,
    referenceCode: "FT24345006150244",
    accumulated: 0,
    id: 5288685
};

// Tạo nội dung thông báo cho Discord
const message = {
    content: `@here **Thông báo giao dịch từ MBBank**\n` +
             `**Ngày giao dịch**: ${data.transactionDate}\n` +
             `**Số tài khoản**: ${data.accountNumber}\n` +
             `**Nội dung giao dịch**: ${data.content}\n` +
             `**Số tiền giao dịch**: ${data.transferAmount.toLocaleString()} VND\n` +
             `**Loại giao dịch**: ${data.transferType}\n` +
             `**Mã tham chiếu**: ${data.referenceCode}\n` +
             `**Mô tả**: ${data.description}`,
    allowed_mentions: {
        parse: ["everyone", "here"] // Cho phép tag @everyone và @here
    }
};

// Gửi dữ liệu đến Discord Webhook
axios.post(webhookUrl, message)
    .then(response => {
        console.log('Gửi thông báo thành công:', response.data);
    })
    .catch(error => {
        console.error('Lỗi khi gửi thông báo:', error);
    });
