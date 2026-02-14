import React from 'react';

const ShippingReturns = () => {
    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="section-title">Shipping & Returns</h1>

            <div className="content-wrapper" style={{ lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>
                <h3 style={{ marginTop: '20px' }}>Shipping Information</h3>
                <p>We are committed to delivering your order accurately, in good condition, and always on time.</p>

                <h4 style={{ marginTop: '15px' }}>Delivery Time and Charges</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                    <li><strong style={{ display: 'inline-block', width: '220px' }}>Inside Dhaka:</strong> Delivery within 2-3 business days. Delivery charge: ৳80.</li>
                    <li><strong style={{ display: 'inline-block', width: '220px' }}>Outside Dhaka (Regular):</strong> Delivery within 3-5 business days. Delivery charge: ৳150.</li>
                    <li><strong style={{ display: 'inline-block', width: '220px' }}>Outside Dhaka (Express):</strong> Delivery within 2-3 business days. Delivery charge: ৳200.</li>
                </ul>

                <h4 style={{ marginTop: '15px' }}>Shipping Method</h4>
                <p>We use reputable courier services like Steadfast, Sundarban Courier, and Pathao to ensure your package is handled with care. You can track your order using the order ID provided in your confirmation email.</p>

                <h3 style={{ marginTop: '30px' }}>Returns & Replacements</h3>
                <p>Your satisfaction is our priority. If you receive a damaged or incorrect product, please contact us within 24 hours of delivery.</p>

                <h4 style={{ marginTop: '15px' }}>Conditions for Return</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                    <li>Ideally, the product should be unused and in its original packaging.</li>
                    <li>Receipt or proof of purchase is required.</li>
                    <li>Damaged items must be reported immediately upon receipt.</li>
                </ul>

                <h4 style={{ marginTop: '15px' }}>Refund Process</h4>
                <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment or bKash within 7 days.</p>

                <h4 style={{ marginTop: '15px' }}>Contact for Returns</h4>
                <p>Email: support@roboxpressbd.com<br />Phone: +8801303897972</p>
            </div>
        </div>
    );
};

export default ShippingReturns;
