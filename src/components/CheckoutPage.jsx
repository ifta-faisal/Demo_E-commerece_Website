import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ cartItems, onPlaceOrder, convertPrice }) => {
    // If empty for some reason, use the same mock logic as Cart or specific mock for visual checkout demo
    const displayItems = cartItems.length > 0 ? cartItems : [
        { name: 'Sunlu PETG Filament – 1.75mm (1kg) - Black', price: 1900.00, quantity: 1 }
    ];

    const subtotal = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // Default shipping matches screenshot selection
    const [shippingMethod, setShippingMethod] = useState('inside');
    const shippingCosts = { 'inside': 150, 'local': 0, 'emergency': 2000 };
    const total = subtotal + shippingCosts[shippingMethod];

    const [paymentMethod, setPaymentMethod] = useState('bank'); // bank, cod, bkash, rocket, nagad

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'Bangladesh',
        streetAddress: '',
        apartment: '',
        city: '',
        district: 'Select an option...',
        zip: '',
        phone: '',
        email: '',
        createAccount: false,
        shipToDifferent: false,
        orderNotes: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBillingDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePlaceOrderClick = () => {
        onPlaceOrder({
            billingDetails,
            shippingMethod: shippingMethod === 'inside' ? 'Sundarban Courier' : shippingMethod === 'local' ? 'Local Pickup' : 'Emergency China-Bangladesh',
            shippingCost: shippingCosts[shippingMethod],
            paymentMethod: paymentMethod === 'bank' ? 'Direct bank transfer' : paymentMethod === 'cod' ? 'Cash on delivery' : paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'rocket' ? 'Rocket' : 'Nagad'
        });
    };

    return (
        <div className="checkout-page-container container">
            <div className="checkout-breadcrumb">
                <span>Home</span> <span className="separator">&gt;</span> <span className="current">Checkout</span>
            </div>

            <h1 className="checkout-page-title">Checkout</h1>

            <div className="checkout-alerts">
                <div className="alert-bar">
                    Returning customer? <a href="#">Click here to login</a>
                </div>
                <div className="alert-bar">
                    Have a coupon? <a href="#">Click here to enter your code</a>
                </div>
            </div>

            <div className="checkout-layout">
                {/* Billing Details Column */}
                <div className="billing-column">
                    <h2 className="column-title">Billing details</h2>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>First name *</label>
                            <input type="text" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group half">
                            <label>Last name *</label>
                            <input type="text" name="lastName" value={billingDetails.lastName} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Company name (optional)</label>
                        <input type="text" name="companyName" value={billingDetails.companyName} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Country / Region *</label>
                        <select name="country" value={billingDetails.country} onChange={handleInputChange}>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Street address *</label>
                        <input type="text" name="streetAddress" placeholder="House number and street name" style={{ marginBottom: '10px' }} value={billingDetails.streetAddress} onChange={handleInputChange} />
                        <input type="text" name="apartment" placeholder="Apartment, suite, unit, etc. (optional)" value={billingDetails.apartment} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Town / City *</label>
                        <input type="text" name="city" value={billingDetails.city} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>District *</label>
                        <select name="district" value={billingDetails.district} onChange={handleInputChange}>
                            <option>Select an option...</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Sylhet</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Postcode / ZIP (optional)</label>
                        <input type="text" name="zip" value={billingDetails.zip} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone *</label>
                        <input type="tel" name="phone" value={billingDetails.phone} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Email address *</label>
                        <input type="email" name="email" value={billingDetails.email} onChange={handleInputChange} />
                    </div>

                    <div className="form-checkbox">
                        <label><input type="checkbox" name="createAccount" checked={billingDetails.createAccount} onChange={handleInputChange} /> Create an account?</label>
                    </div>

                    <div className="shipping-details-section">
                        <h2 className="column-title" style={{ marginTop: '30px', fontSize: '1.2rem' }}>Shipping Details</h2>
                        <div className="form-checkbox">
                            <label><input type="checkbox" name="shipToDifferent" checked={billingDetails.shipToDifferent} onChange={handleInputChange} /> Ship to a different address?</label>
                        </div>

                        <div className="form-group">
                            <label>Order notes (optional)</label>
                            <textarea name="orderNotes" placeholder="Notes about your order, e.g. special notes for delivery." value={billingDetails.orderNotes} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                </div>

                {/* Your Order Column */}
                <div className="order-column">
                    <div className="order-summary-box">
                        <h2 className="column-title">Your order</h2>

                        <div className="order-table">
                            <div className="order-row header">
                                <span>Product</span>
                                <span>Subtotal</span>
                            </div>

                            {displayItems.map((item, idx) => (
                                <div className="order-row item" key={idx}>
                                    <span className="prod-name">{item.name} <strong className="qty">× {item.quantity}</strong></span>
                                    <span className="prod-subtotal">{convertPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}

                            <div className="order-row subtotal">
                                <span>Subtotal</span>
                                <span>{convertPrice(subtotal)}</span>
                            </div>

                            <div className="order-row shipping">
                                <span className="label">Shipping</span>
                                <div className="shipping-options-list">
                                    <label>
                                        <input
                                            type="radio"
                                            name="checkout_shipping"
                                            checked={shippingMethod === 'inside'}
                                            onChange={() => setShippingMethod('inside')}
                                        />
                                        Sundarban Courier: <span>{convertPrice(150.00)}</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="checkout_shipping"
                                            checked={shippingMethod === 'local'}
                                            onChange={() => setShippingMethod('local')}
                                        />
                                        Local Pickup (Sayed Nagar, Vatara, Dhaka 1212)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="checkout_shipping"
                                            checked={shippingMethod === 'emergency'}
                                            onChange={() => setShippingMethod('emergency')}
                                        />
                                        Emergency China-Bangladesh (4-8 days) – 1kg: <span>{convertPrice(2000.00)}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="order-row total">
                                <span>Total</span>
                                <span className="total-amount">{convertPrice(total)} <small>(includes {convertPrice(132.56)} Tax estimated for Bangladesh)</small></span>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="payment-methods">
                            <div className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}>
                                <label>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={paymentMethod === 'bank'}
                                        onChange={() => setPaymentMethod('bank')}
                                    />
                                    Direct bank transfer
                                </label>
                                {paymentMethod === 'bank' && (
                                    <div className="payment-info-box">
                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account. If you forget to use your Order ID when transferring the payment, don't worry just send us a short email here: support@roboxpressbd.com
                                    </div>
                                )}
                            </div>

                            <div className="payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                    />
                                    Cash on delivery (In stock Products Only)
                                </label>
                            </div>

                            <div className="payment-method icon-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={paymentMethod === 'bkash'}
                                        onChange={() => setPaymentMethod('bkash')}
                                    />
                                    bKash
                                </label>
                                <img src="https://cdn.iconscout.com/icon/free/png-256/free-bkash-logo-icon-download-in-svg-png-gif-file-formats--bangladesh-payment-method-company-brand-logos-pack-icons-6296316.png?f=webp&w=256" alt="bKash" />
                            </div>

                            <div className="payment-method icon-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={paymentMethod === 'rocket'}
                                        onChange={() => setPaymentMethod('rocket')}
                                    />
                                    Rocket
                                </label>
                                <img src="https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png" alt="Rocket" />
                            </div>

                            <div className="payment-method icon-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={paymentMethod === 'nagad'}
                                        onChange={() => setPaymentMethod('nagad')}
                                    />
                                    Nagad
                                </label>
                                <img src="https://download.logo.wine/logo/Nagad/Nagad-Vertical-Logo.wine.png" alt="Nagad" style={{ height: '25px' }} />
                            </div>
                        </div>

                        <div className="policy-text">
                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                        </div>

                        <div className="terms-checkbox">
                            <label>
                                <input type="checkbox" /> I have read and agree to the website <a href="#">terms and conditions</a> *
                            </label>
                        </div>

                        <button className="place-order-btn" onClick={handlePlaceOrderClick}>
                            Place order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
