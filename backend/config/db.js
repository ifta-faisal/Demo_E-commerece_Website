const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB at: ${process.env.MONGO_URI}...`);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);

        // Fallback for Node 17+ which sometimes prefers 127.0.0.1 over localhost
        if (process.env.MONGO_URI.includes('localhost')) {
            try {
                console.log('Retrying with 127.0.0.1...');
                const newUri = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
                await mongoose.connect(newUri);
                console.log('✅ MongoDB Connected Successfully (via 127.0.0.1)!');
                return;
            } catch (retryErr) {
                console.error('Retry failed:', retryErr.message);
            }
        }

        console.log('⚠️ Running in IN-MEMORY MODE (No persistent data storage). Make sure MongoDB is running.');
    }
};

module.exports = connectDB;
