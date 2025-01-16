const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://amigos:7JlEU8k80vhGFHCy@bot-amigos-new.8zftx.mongodb.net/?retryWrites=true&w=majority&appName=bot-amigos-new', {
            serverSelectionTimeoutMS: 50000, // Tăng thời gian chờ khi chọn server (50 giây)
            connectTimeoutMS: 30000, // Tăng thời gian chờ kết nối (30 giây)
            socketTimeoutMS: 45000,  // Tăng thời gian chờ socket (45 giây)
            retryWrites: true,
            w: 'majority'
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1); // Dừng chương trình nếu kết nối thất bại
    }
};

module.exports = { connectDB };
