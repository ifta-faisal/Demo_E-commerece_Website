import React, { useState } from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, convertPrice }) => {
    // Determine items to display: actual props or a mock item if empty for demo purposes as per user request to "look like this"
    if (cartItems.length === 0) {
        return (
            <div className="cart-page-container container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <h1>Your cart is currently empty.</h1>
                <p>Return to our shop to add items.</p>
                <button className="checkout-btn" onClick={() => window.location.href = '/'} style={{ marginTop: '20px', display: 'inline-block' }}>Return to Shop</button>
            </div>
        );
    }

    const displayItems = cartItems;

    const subtotal = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const [shippingMethod, setShippingMethod] = useState('inside'); // inside, local, emergency

    const shippingCost = {
        'inside': 150,
        'local': 0,
        'emergency': 2000
    }[shippingMethod];

    const total = subtotal + shippingCost;

    return (
        <div className="cart-page-container container">
            {/* Breadcrumb */}
            <div className="cart-breadcrumb">
                <span>Home</span> <span className="separator">&gt;</span> <span className="current">Cart</span>
            </div>

            <h1 className="cart-page-title">Cart</h1>

            <div className="cart-layout">
                <div className="cart-content">
                    {/* Cart Table Header */}
                    <div className="cart-table-header">
                        <div className="col-remove"></div>
                        <div className="col-thumb"></div>
                        <div className="col-product">Product</div>
                        <div className="col-price">Price</div>
                        <div className="col-qty">Quantity</div>
                        <div className="col-subtotal">Subtotal</div>
                    </div>

                    {/* Cart Items */}
                    <div className="cart-items-list">
                        {displayItems.map((item, idx) => (
                            <div className="cart-item-row" key={item.id || idx}>
                                <div className="col-remove">
                                    <button className="remove-btn" onClick={() => onRemoveItem && onRemoveItem(item.id)}>&times;</button>
                                </div>
                                <div className="col-thumb">
                                    <img src={item.imageUrl} alt={item.name} />
                                </div>
                                <div className="col-product">
                                    <span>{item.name}</span>
                                </div>
                                <div className="col-price">
                                    {convertPrice(item.price)}
                                </div>
                                <div className="col-qty">
                                    <div className="qty-input">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => onUpdateQuantity && onUpdateQuantity(item.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="col-subtotal">
                                    {convertPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions & Coupon */}
                    <div className="cart-actions-row">
                        <div className="coupon-section">
                            <input type="text" placeholder="Coupon code" className="coupon-input" />
                            <button className="apply-coupon-btn">Apply coupon</button>
                        </div>

                        <div className="update-actions">
                            <button className="update-cart-btn" disabled>Update cart</button>
                            <button className="checkout-btn" onClick={onCheckout}>Proceed to checkout</button>
                        </div>
                    </div>
                </div>

                {/* Cart Totals Sidebar */}
                <div className="cart-totals-sidebar">
                    <h3>Cart totals</h3>

                    <div className="totals-row">
                        <span className="label">Subtotal</span>
                        <span className="value">{convertPrice(subtotal)}</span>
                    </div>

                    <div className="shipping-section">
                        <span className="label">Shipping</span>
                        <div className="shipping-options">
                            <div className="shipping-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        checked={shippingMethod === 'inside'}
                                        onChange={() => setShippingMethod('inside')}
                                    />
                                    Sundarban Courier: <span className="price">{convertPrice(150)}</span>
                                </label>
                            </div>
                            <div className="shipping-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        checked={shippingMethod === 'local'}
                                        onChange={() => setShippingMethod('local')}
                                    />
                                    Local Pickup (Sayed Nagar, Vatara, Dhaka 1212)
                                </label>
                            </div>
                            <div className="shipping-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="shipping"
                                        checked={shippingMethod === 'emergency'}
                                        onChange={() => setShippingMethod('emergency')}
                                    />
                                    Emergency China-Bangladesh (4-8 days) – 1kg: <span className="price">{convertPrice(2000)}</span>
                                </label>
                            </div>
                            <p className="shipping-note">Shipping options will be updated during checkout.</p>
                            <a href="#" className="calc-shipping-link">Calculate shipping 📦</a>
                        </div>
                    </div>

                    <div className="totals-row total-final">
                        <span className="label">Total</span>
                        <span className="value">{convertPrice(total)} <span className="tax-note">(includes {convertPrice(132.56)} Tax estimated for Bangladesh)</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
