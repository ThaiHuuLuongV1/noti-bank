const mongoose = require('mongoose');

const keyCheatSchema = new mongoose.Schema({
    KeyCheatName: { type: String, required: true },  // Set required to true
    KeyCheatType: { type: String, required: true },
    price: { type: Number, required: true },
    key: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, default: '' },  // Optional field with default value
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    usedAt: { type: Date, default: '' },
    usedUser: { type: String, default: '' },
    usedUserId: { type: String, default: '' },
});

const KeyCheat = mongoose.model('KeyCheat', keyCheatSchema);

module.exports = { KeyCheat };
