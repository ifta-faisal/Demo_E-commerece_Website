
import React from 'react';
import './FreeOffers.css';

const FreeOffers = () => {
    return (
        <div className="free-offers-page">
            <div className="container page-header-simple">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="breadcrumb-simple">
                        HOME <span>/</span> FREE OFFERS BY DOLLAR AMOUNT
                    </div>
                    {/* Social icons top right */}
                    <div className="social-icons-micro" style={{ display: 'flex', gap: '10px' }}>
                        <svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                        <svg width="16" height="16" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
                        <svg width="16" height="16" fill="#333" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27z"></path></svg>
                    </div>
                </div>
            </div>

            <div className="page-title-row">
                <h1>Free Offers by Dollar Amount</h1>
            </div>

            <div className="content-container">
                <h2 className="content-subtitle">Free Offers by Dollar Amount</h2>

                <p className="content-text">
                    Discover incredible savings with our <strong>Free Offers by Dollar Amount</strong> program, designed to reward our loyal customers. This unique offering allows you to select from a range of free products based on your total spending. Whether you're stocking up on essential gear or trying out new items, our free offers provide an excellent way to enhance your shopping experience without breaking the bank.
                </p>

                <p className="content-text">
                    With the <strong>Free Offers by Dollar Amount</strong>, you can easily see what items are available as complimentary gifts when you reach specific spending thresholds. This program not only adds value to your purchases but also encourages you to explore our extensive product range. Enjoy the thrill of receiving extra goodies while indulging in your favorite FPV racing and drone technology.
                </p>

                <p className="content-text">
                    Join the excitement of shopping with our <strong>Free Offers by Dollar Amount</strong> and make the most of your experience today!
                </p>

                <div className="highlight-box">
                    <h2>Free Offers by Dollar Amount.</h2>
                    <p className="highlight-sub">
                        Unlock delightful surprises at every spending tier. Limit one free offer per order.<br />
                        Offers do not stack with discount codes.
                    </p>

                    <div className="offer-links">
                        <span className="offer-link">View qualifying offers when you spend $500 OR MORE</span>
                        <span className="offer-link">View qualifying offers when you spend $300 OR MORE</span>
                        <span className="offer-link">View qualifying offers when you spend $250 OR MORE</span>
                        <span className="offer-link">View qualifying offers when you spend $150 OR MORE</span>
                        <span className="offer-link">View qualifying offers when you spend $100 OR MORE</span>
                    </div>

                    <p className="instruction-text">
                        🛒 Reach the spending threshold, then SELECT your desired offer from the qualifying tier and add it to your cart. Your chosen item will become free.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FreeOffers;
