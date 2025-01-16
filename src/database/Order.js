const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    selectedCheat: String,
    typeOfCheat: {
        label: String,
        value: Number
    },
    quantity: Number,
    finalPrice: Number,
    discountCode: String,
    vipName: String,
    transactionCode: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
