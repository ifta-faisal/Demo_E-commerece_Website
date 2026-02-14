
import React from 'react';
import './FeaturesBanner.css';

const FeaturesBanner = () => {
    return (
        <div className="features-banner">
            <div className="features-container">
                {/* Feature 1: Rocket/Shipping */}
                <div className="feature-item">
                    <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M13.5 6.5l4-4.5 5 1.5-1.5 5-4.5 4L2 22l6.5-6.5L12 18l1.5-3.5L10 11l3.5-4.5z" />
                            <path d="M12 11l3.5 1.5" />
                            <path d="M10 11l-1.5 3.5" />
                        </svg>
                    </div>
                    <div className="feature-text">
                        <h3>Free Domestic Shipping</h3>
                        <p>When you spend $80+</p>
                    </div>
                </div>

                {/* Feature 2: Box/Same-Day */}
                <div className="feature-item">
                    <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </div>
                    <div className="feature-text">
                        <h3>Same-Day Shipping</h3>
                        <p>Mon-Fri til 3pm PST, Sat til 12pm PST</p>
                    </div>
                </div>

                {/* Feature 3: Phone/Support */}
                <div className="feature-item">
                    <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </div>
                    <div className="feature-text">
                        <h3>Customer Support</h3>
                        <p>Industry Leading Support</p>
                    </div>
                </div>

                {/* Feature 4: Wallet/Best Prices */}
                <div className="feature-item">
                    <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                    <div className="feature-text">
                        <h3>Best Prices</h3>
                        <p>Price Match Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesBanner;
