const mongoose = require('mongoose');

const userGiveSchema = new mongoose.Schema({
    userId: String,
    invitedCount: { type: Number, default: 0 }
});
const UserGive = mongoose.model('UserGive', userGiveSchema);

module.exports = { UserGive };
