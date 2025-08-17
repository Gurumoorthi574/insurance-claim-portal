const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserModel = require('../models/users');
const nodemailer = require('nodemailer');

router.post('/forgot-password', async (req, res) => {
    const { emailId } = req.body;
    let users; // Define users here to access it in the catch block
    try {
        users = await UserModel.findOne({ emailId });

        if (!users) {
            // We send a generic success message to prevent email enumeration
            return res.status(200).json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
        }

        // Get reset token
        const resetToken = users.getResetPasswordToken();

        await users.save({ validateBeforeSave: false }); // The model method should handle saving the token fields

        // Create reset URL for the frontend
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
        console.log(`Reset URL: ${resetUrl}`);
        // --- Email Sending Logic ---
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                UserModel: process.env.GMAIL_USER, // Your Gmail address from .env
                pass: process.env.GMAIL_PASS  // Your Gmail App Password from .env
            }
        });

        const mailOptions = {
            from: `"Insurance Claim Portal" <${process.env.GMAIL_USER}>`,
            to: users.emailId,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
                  `${resetUrl}\n\n` +
                  `This link will expire in one hour.\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        // --- End of Email Sending Logic ---

        res.status(200).json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    // Get hashed token
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    try {
        const users = await UserModel.findOne({
            passwordResetToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!users) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Set new password
        users.password = await bcrypt.hash(req.body.password, 10);
        users.passwordResetToken = undefined;
        users.passwordResetExpires = undefined;

        await users.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;