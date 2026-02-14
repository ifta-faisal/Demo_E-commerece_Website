
import React from 'react';
import './Cart.css';

const Cart = ({ onNavigate }) => {
    return (
        <div className="cart-page">
            <div className="container header-breadcrumbs-cart">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="cart-breadcrumb">
                        HOME / YOUR SHOPPING CART
                    </div>
                    <div className="social-icons-micro" style={{ display: 'flex', gap: '10px' }}>
                        <svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                        <svg width="16" height="16" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
                        <svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27z"></path></svg>
                    </div>
                </div>
            </div>

            <div className="cart-content-centered">
                <h1>Shopping Cart</h1>
                <div className="empty-cart-message">
                    <p>Your cart is currently empty.</p>
                    <p className="continue-link">Continue browsing <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>here</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
