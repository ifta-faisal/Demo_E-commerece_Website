const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    vendor: String,
    imageUrl: String,
    images: [String],
    specifications: { type: Map, of: String }  // Store specifications as key-value pairs
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
