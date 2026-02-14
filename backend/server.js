require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // For testing invoice generation

const PORT = process.env.PORT || 5000;

const { seedProductsFromCsv } = require('./controllers/productController');
const path = require('path');

// Seed products if file exists
seedProductsFromCsv(path.join(__dirname, 'products.csv'));

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server failed to start:', err);
});

// Keep process alive just in case
setInterval(() => {
    // Heartbeat
}, 60000);
