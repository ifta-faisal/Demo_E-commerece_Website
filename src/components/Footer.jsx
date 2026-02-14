import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ showNewsletter = true, onNavigate }) => {
    const [showTopButton, setShowTopButton] = useState(false);
    const [email, setEmail] = useState('');
    const [signedUp, setSignedUp] = useState(false);

    const handleEmailSubmit = (e) => {
        if (e.key === 'Enter' && email.trim() !== '') {
            e.preventDefault();
            setSignedUp(true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Get the featured products section
            const featuredSection = document.querySelector('.featured-section');

            if (featuredSection) {
                const featuredBottom = featuredSection.offsetTop + featuredSection.offsetHeight;
                const scrollPosition = window.scrollY + window.innerHeight;

                // Show button when scrolled past the featured products section
                if (scrollPosition > featuredBottom) {
                    setShowTopButton(true);
                } else {
                    setShowTopButton(false);
                }
            } else {
                // Fallback: show after 500px if section not found
                if (window.scrollY > 500) {
                    setShowTopButton(true);
                } else {
                    setShowTopButton(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Check initial position
        handleScroll();

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            {showNewsletter && (
                <div className="newsletter-section">
                    <div className="newsletter-container">
                        <h3 className="newsletter-title">KEEP IN TOUCH</h3>
                        <p className="newsletter-subtitle">KEEP SUPPORTING US!</p>
                        <div className="newsletter-input-wrapper">
                            {!signedUp ? (
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL AND PRESS ENTER"
                                    className="newsletter-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleEmailSubmit}
                                />
                            ) : (
                                <p className="newsletter-success" style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>
                                    Thanks for Being with us!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Links */}
            <div className="footer-links">
                <div className="footer-container">
                    <div className="footer-column">
                        <h4>RoboXpressbd.com</h4>
                        <ul>
                            {/* <li><a href="#">Track a Package</a></li> */}
                            {/* <li><a href="#">Downloads</a></li> */}
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
                            {/* <li><a href="#">Team Pilots</a></li> */}
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shipping'); }}>Shipping & Returns</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}>Terms & Conditions</a></li>
                            {/* <li><a href="#">DroneLabs</a></li>
                            <li><a href="#">Become a Dealer</a></li>
                            <li><a href="#">Become Much Stronger</a></li> */}
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>HERE TO HELP</h4>
                        <p className="footer-email">roboxpressbd@gmail.com</p>
                        <p className="footer-address">Notunbazar, Vatara, Dhaka-1212, Bangladesh</p>
                        <p>Phone: (+880) 1303897972</p>
                        {/* <p>CAGE: 9BAU2</p>
                        <p>UEI: UBQJLDZRXQS3</p> */}
                    </div>

                    <div className="footer-column">
                        <h4>FOLLOW US</h4>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/roboxpressbd" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a href="https://wa.me/8801303897972" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/roboxpressbd" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment & Copyright */}
            <div className="footer-bottom">
                <p className="payment-title">Accepted Payments</p>
                <div className="payment-methods">
                    {/* bKash */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#E2136E" fontSize="10" fontWeight="bold" fontFamily="Arial">bKash</text>
                        </svg>
                    </div>
                    {/* Nagad */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#EC1C24" fontSize="10" fontWeight="bold" fontFamily="Arial">Nagad</text>
                        </svg>
                    </div>
                    {/* Rocket */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#8C3494" fontSize="10" fontWeight="bold" fontFamily="Arial">Rocket</text>
                        </svg>
                    </div>
                    {/* Diners Club */}
                    {/* <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <circle cx="18" cy="16" r="7" fill="#0079BE" />
                            <circle cx="32" cy="16" r="7" fill="#0079BE" />
                        </svg>
                    </div> */}
                    {/* Discover */}
                    {/* <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="8" y="18" fill="#000" fontSize="7" fontWeight="bold">DISCOVER</text>
                            <circle cx="42" cy="16" r="6" fill="#FF6000" />
                        </svg>
                    </div> */}
                    {/* Google Pay */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#5F6368" fontSize="8" fontWeight="500">G Pay</text>
                        </svg>
                    </div>
                    {/* Mastercard */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <circle cx="19" cy="16" r="7" fill="#EB001B" />
                            <circle cx="31" cy="16" r="7" fill="#F79E1B" />
                        </svg>
                    </div>
                    {/* PayPal */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#003087" fontSize="9" fontWeight="bold">PayPal</text>
                        </svg>
                    </div>
                    {/* Shop Pay */}
                    {/* <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="#5A31F4" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">shop</text>
                        </svg>
                    </div> */}
                    {/* Visa */}
                    <div className="payment-icon">
                        <svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="50" height="32" rx="4" fill="white" stroke="#d0d0d0" strokeWidth="1" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#1A1F71" fontSize="11" fontWeight="bold">VISA</text>
                        </svg>
                    </div>
                </div>
                <p className="copyright">© 2026, RoboXpressbd </p>
            </div>

            {/* Floating Contact Widget */}
            <div className="floating-contact-widget">
                <div className="contact-tooltip">Facebook Messenger</div>
                <a href="https://m.me/roboxpressbd" target="_blank" rel="noopener noreferrer" className="contact-icon-btn">
                    <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                        <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.56 5.47 4 7.14V22l3.65-2c1.07.3 2.2.46 3.35.46 5.52 0 10-4.03 10-9S17.52 2 12 2zm1.09 12.33l-2.6-4.15-5.08 4.15 5.59-5.94 2.6 4.15 5.06-4.15-5.57 5.94z" />
                    </svg>
                </a>
            </div>

            <div className={`floating-top-btn ${!showTopButton ? 'hidden' : ''}`} onClick={scrollToTop}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
