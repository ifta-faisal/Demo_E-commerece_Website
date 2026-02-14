const Order = require('../models/Order');
const User = require('../models/User');
const generateInvoice = require('../utils/invoiceGenerator');
const sendEmail = require('../utils/emailService');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Counter = require('../models/Counter');

let localOrders = [];
const isDbConnected = () => mongoose.connection.readyState === 1;

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, billingDetails, shippingMethod, shippingCost, paymentMethod } = req.body;

        // Calculate total
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const totalAmount = subtotal + (shippingCost || 0);

        let order;
        let customerEmail = billingDetails?.email || 'customer@example.com';
        let orderId;

        if (!isDbConnected()) {
            console.log('Using In-Memory Order Store');
            // Mock logic for offline testing
            orderId = localOrders.length + 1;
            order = {
                _id: Date.now().toString(), // fake ID
                orderId,
                userId,
                items,
                billingDetails,
                shippingMethod,
                shippingCost,
                paymentMethod,
                totalAmount,
                status: 'Pending',
                createdAt: new Date()
            };
            localOrders.push(order);
        } else {
            // Get next sequence number
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'orderId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            orderId = counter.seq;

            order = new Order({
                userId,
                orderId,
                items,
                billingDetails,
                shippingMethod,
                shippingCost,
                paymentMethod,
                totalAmount
            });
            await order.save();

            // We prefer the email from billing details if available
            if (billingDetails && billingDetails.email) {
                customerEmail = billingDetails.email;
            } else {
                const user = await User.findById(userId);
                if (user) customerEmail = user.email;
            }
        }

        // Generate Invoice
        // Note: generateInvoice expects an object with _id, userId, items...
        generateInvoice(order, async (err, pdfBuffer) => {
            if (err) {
                console.error('Error generating invoice:', err);
                return;
            }

            // Save PDF locally for debugging
            const invoicePath = path.join(__dirname, '../invoices', `invoice-${order._id}.pdf`);
            fs.writeFile(invoicePath, pdfBuffer, (writeErr) => {
                if (writeErr) console.error('Error saving local invoice:', writeErr);
                else console.log(`Invoice saved locally to: ${invoicePath}`);
            });

            const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

            // Send to Customer
            try {
                // Use orderId if available
                const emailOrderId = order.orderId || order._id;

                await sendEmail(
                    customerEmail,
                    `Order Confirmation #${emailOrderId}`,
                    '<p>Thank you for your order. Please find your invoice attached.</p>',
                    [{ filename: `invoice-${emailOrderId}.pdf`, content: pdfBuffer }]
                );
            } catch (e) {
                console.error("Email error (Customer):", e.message);
                if (e.code === 'EAUTH') console.error("HINT: You need to use a Google App Password, not your login password.");
            }

            // Send to Admin
            try {
                const emailOrderId = order.orderId || order._id;
                await sendEmail(
                    adminEmail,
                    `New Order Received #${emailOrderId}`,
                    `<p>New order from ${customerEmail}. Invoice attached.</p>`,
                    [{ filename: `invoice-${emailOrderId}.pdf`, content: pdfBuffer }]
                );
            } catch (e) { console.error("Email error (Admin):", e.message); }
        });

        res.status(201).json({ message: 'Order placed and invoice sent.', order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};
