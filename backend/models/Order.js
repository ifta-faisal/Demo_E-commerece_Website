const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Number }, // Sequential Order ID
    billingDetails: {
        firstName: String,
        lastName: String,
        companyName: String,
        country: String,
        streetAddress: String,
        apartment: String,
        city: String,
        district: String,
        zip: String,
        phone: String,
        email: String
    },
    shippingMethod: String,
    shippingCost: Number,
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    paymentMethod: String,
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
