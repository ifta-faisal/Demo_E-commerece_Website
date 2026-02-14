const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/emailService');
const mongoose = require('mongoose');

// Fallback in-memory storage
let localUsers = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- FALLBACK LOGIC ---
        if (!isDbConnected()) {
            console.log('Using In-Memory User Store');
            let user = localUsers.find(u => u.email === email);
            if (user && user.isVerified) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = Date.now() + 10 * 60 * 1000;

            if (!user) {
                user = {
                    _id: Date.now().toString(), // fake ID
                    email,
                    password, // In real app, hash it. Here we store as is or hash if we want
                    otp,
                    otpExpires,
                    isVerified: false
                };
                localUsers.push(user);
            } else {
                user.otp = otp;
                user.otpExpires = otpExpires;
            }

            console.log(`[DEV ONLY - MEMORY] OTP for ${email}: ${otp}`);

            // Try sending email (mock or real)
            try {
                await sendEmail(email, 'Your Verification Code', `<p>${otp}</p>`);
            } catch (e) { console.log('Email failed'); }

            return res.status(201).json({ message: 'Signup (Memory) successful. Check console for OTP.' });
        }
        // ----------------------

        let user = await User.findOne({ email });
        if (user && user.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        if (!user) {
            user = new User({
                email,
                password: hashedPassword,
                otp,
                otpExpires,
                isVerified: false
            });
        } else {
            user.password = hashedPassword;
            user.otp = otp;
            user.otpExpires = otpExpires;
        }

        await user.save();

        console.log(`[DEV ONLY] OTP for ${email}: ${otp}`);

        try {
            await sendEmail(
                email,
                'Your Verification Code',
                `<p>Your OTP is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`
            );
        } catch (err) {
            console.error("Email service error:", err.message);
        }

        res.status(201).json({ message: 'Signup successful. OTP sent to email.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // --- FALLBACK LOGIC ---
        if (!isDbConnected()) {
            const user = localUsers.find(u => u.email === email);
            if (!user) return res.status(400).json({ message: 'User not found' });
            if (user.isVerified) return res.status(200).json({ message: 'Already verified' });
            if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
            if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

            user.isVerified = true;
            user.otp = undefined;
            return res.status(200).json({ message: 'Verified (Memory).' });
        }
        // ----------------------

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: 'User already verified' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
