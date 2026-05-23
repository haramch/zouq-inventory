const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateVerificationCode, sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailUtils');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @route   POST /api/auth/register
// @desc    Register new user with email
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate verification code
        const verificationCode = generateVerificationCode();

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            emailVerificationCode: verificationCode
        });

        // Send verification email in background (don't wait)
        sendVerificationEmail(user.email, verificationCode).catch(err =>
            console.error('Background email error:', err)
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            message: 'Verification code sent to your email. Please verify to complete registration.'
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email with code
// @access  Public
router.post('/verify-email', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and verification code required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.emailVerificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        // Mark email as verified
        user.emailVerified = true;
        user.emailVerificationCode = null;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            token: generateToken(user._id),
            message: 'Email verified successfully'
        });
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user with email & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await user.comparePassword(password))) {
            if (!user.emailVerified) {
                return res.status(400).json({ message: 'Please verify your email first' });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset code to email
// @access  Public
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Please provide email' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset code
        const resetCode = generateVerificationCode();
        const resetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        user.resetPasswordCode = resetCode;
        user.resetPasswordExpires = resetExpires;
        await user.save();

        // Send reset email in background (don't wait)
        sendPasswordResetEmail(user.email, resetCode).catch(err =>
            console.error('Background email error:', err)
        );

        res.json({
            message: 'Password reset code sent to your email'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with code
// @access  Public
router.post('/reset-password', async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: 'Email, code, and new password required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.resetPasswordCode !== code) {
            return res.status(400).json({ message: 'Invalid reset code' });
        }

        if (!user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: 'Reset code expired' });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordCode = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
});

module.exports = router;
