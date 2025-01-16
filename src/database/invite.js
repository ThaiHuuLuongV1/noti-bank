const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Mã mời
    inviterId: { type: String, required: true }, // ID người mời
    inviterUsername: { type: String, required: true }, // Tên người mời
    uses: { type: Number, default: 0 }, // Số lần sử dụng
    invitedUsers: [
        {
            userId: { type: String, required: true }, // ID người được mời
            inviteCode: { type: String, required: true } // Mã mời liên quan
        }
    ]
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = { Invite };