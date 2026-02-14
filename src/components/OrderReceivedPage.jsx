import React from 'react';
import './OrderReceivedPage.css';

const OrderReceivedPage = ({ orderData, convertPrice }) => {
    // Fallback/Mock Data if orderData is empty
    const orderBuffer = orderData || {
        orderNumber: 14477,
        date: "January 27, 2026",
        total: 2050.00,
        paymentMethod: "Direct bank transfer",
        cartItems: [
            { name: 'Sunlu PETG Filament – 1.75mm (1kg) - Black', price: 1900.00, quantity: 1 }
        ],
        subtotal: 1900.00,
        shippingCost: 150.00,
        shippingMethod: "Sundarban Courier",
        billing: {
            name: "Ifta Faisal",
            address: "PurboTengri Hospital Road Zigatola",
            city: "Ishwardi",
            district: "Dhaka",
            postcode: "6620",
            phone: "01303897972",
            email: "iftafaisal759@gmail.com"
        }
    };

    return (
        <div className="order-received-container container">
            <div className="order-breadcrumb">
                <span>Home</span> <span className="separator">&gt;</span> <span>Checkout</span> <span className="separator">&gt;</span> <span className="current">Order received</span>
            </div>

            <h1 className="page-title">Order received</h1>

            <div className="thank-you-box">
                <p>Thank you. Your order has been received.</p>
                <ul className="order-meta-list">
                    <li>Order number: <strong>{orderBuffer.orderNumber}</strong></li>
                    <li>Date: <strong>{orderBuffer.date}</strong></li>
                    <li>Total: <strong>{convertPrice(orderBuffer.total)}</strong></li>
                    <li>Payment method: <strong>{orderBuffer.paymentMethod}</strong></li>
                </ul>
            </div>

            <div className="bank-details-section">
                <p>If you are a Bangladeshi customer here is the Branch Name: Ishwardi Branch</p>

                <h2>Our bank details</h2>

                <div className="bank-info-block">
                    <h3>Ifta Faisal:</h3>
                    <div className="bank-separator"></div>
                    <ul className="bank-list">
                        <li>Bank: <strong>Brack Bank Bank Limited</strong></li>
                        <li>Account number: <strong>1871050013001</strong></li>
                        <li>BIC: <strong>DBBLBDGH</strong></li>
                    </ul>
                </div>
            </div>

            <div className="order-details-section">
                <h2>Order details</h2>

                <table className="confirmation-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderBuffer.cartItems.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.name} <strong>× {item.quantity}</strong></td>
                                <td>{convertPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                        <tr>
                            <th>Subtotal:</th>
                            <td>{convertPrice(orderBuffer.subtotal)}</td>
                        </tr>
                        <tr>
                            <th>Shipping:</th>
                            <td>{convertPrice(orderBuffer.shippingCost)} via {orderBuffer.shippingMethod}</td>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <td>{convertPrice(orderBuffer.total)} <small>(includes {convertPrice(132.56)} Tax)</small></td>
                        </tr>
                        <tr>
                            <th>Payment method:</th>
                            <td>{orderBuffer.paymentMethod}</td>
                        </tr>
                        <tr>
                            <th>Actions:</th>
                            <td><button className="invoice-btn">Invoice</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="customer-details-grid">
                <div className="details-col">
                    <h2>Billing address</h2>
                    <address>
                        {orderBuffer.billing.name}<br />
                        {orderBuffer.billing.address}<br />
                        Hospital Road<br />  {/* Hardcoded from screenshot or part of address */}
                        {orderBuffer.billing.city}<br />
                        {orderBuffer.billing.district}<br />
                        {orderBuffer.billing.postcode}<br />
                        {orderBuffer.billing.phone}<br />
                        <br />
                        {orderBuffer.billing.email}
                    </address>
                </div>
                <div className="details-col">
                    <h2>Shipping address</h2>
                    <address>
                        {orderBuffer.billing.name}<br />
                        {orderBuffer.billing.address}<br />
                        Hospital Road<br />
                        {orderBuffer.billing.city}<br />
                        {orderBuffer.billing.district}<br />
                        {orderBuffer.billing.postcode}
                    </address>
                </div>
            </div>
        </div>
    );
};

export default OrderReceivedPage;
