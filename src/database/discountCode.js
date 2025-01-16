const mongoose = require('mongoose');

// Định nghĩa mô hình mã giảm giá
const discountCodeSchema = new mongoose.Schema({
    code: String,
    discount: Number, // Tỷ lệ giảm giá (trong phần trăm)
    isActive: { type: Boolean, default: false } // Trạng thái mã giảm giá
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = { DiscountCode };
