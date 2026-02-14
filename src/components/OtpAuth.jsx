import React, { useState } from 'react';
import axios from 'axios';

const OtpAuth = () => {
    const [step, setStep] = useState('signup'); // 'signup' or 'verify'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setMessage('Sending OTP...');
            await axios.post('http://localhost:5000/api/auth/signup', { email, password });
            setMessage('OTP sent to your email. Please verify.');
            setStep('verify');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Signup failed');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setMessage('Verifying...');
            await axios.post('http://localhost:5000/api/auth/verify', { email, otp });
            setMessage('Verification successful! You are now verified.');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
            <h3>Secure User Authentication</h3>

            {step === 'signup' && (
                <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            )}

            {step === 'verify' && (
                <form onSubmit={handleVerify}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            disabled
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Enter OTP: </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Verify OTP</button>
                </form>
            )}

            {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
};

export default OtpAuth;
