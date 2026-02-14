
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onNavigate }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStep(2);
        }
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        // Here you would verify the code in a real app
        // For now, we simulate success and go back to home or a logged-in state
        // onNavigate('home'); 
        alert('Logged in successfully!');
        onNavigate('home');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    {/* Logo SVG matching the one in Header */}
                    <svg width="200" height="60" viewBox="0 0 300 60" fill="none">
                        {/* Improved NewBeeDrone Logo approximation */}
                        <g transform="translate(20, 10)">
                            <path d="M25 0 L40 10 L40 30 L25 40 L10 30 L10 10 Z" fill="none" stroke="black" strokeWidth="2.5" />
                            <circle cx="25" cy="20" r="8" fill="none" stroke="black" strokeWidth="2.5" />
                            {/* Propeller arms */}
                            <circle cx="10" cy="5" r="5" stroke="black" strokeWidth="2" />
                            <circle cx="40" cy="5" r="5" stroke="black" strokeWidth="2" />
                            <circle cx="10" cy="35" r="5" stroke="black" strokeWidth="2" />
                            <circle cx="40" cy="35" r="5" stroke="black" strokeWidth="2" />
                        </g>
                        <text x="70" y="38" fontFamily="Arial" fontWeight="bold" fontSize="32" fill="black">NewBeeDrone</text>
                    </svg>
                </div>

                {step === 1 ? (
                    <div className="login-step-content">
                        <h2>Sign in</h2>
                        <p className="sub-text">Sign in or create an account</p>

                        <button className="btn-shop-pay">
                            Continue with <span className="shop-text">shop</span>
                        </button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <form onSubmit={handleEmailSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-continue">
                                Continue
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="login-step-content">
                        <h2>Enter code</h2>
                        <p className="sub-text">Sent to {email}</p>

                        <form onSubmit={handleCodeSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="6-digit code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-continue">
                                Submit
                            </button>
                        </form>

                        <div className="back-link" onClick={() => setStep(1)}>
                            Sign in with a different email
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
