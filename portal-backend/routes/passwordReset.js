const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserModel = require('../models/users');
const { sendPasswordResetEmail } = require('./sendPasswordResetEmail');


router.post('/forgot-password', async (req, res) => {
    const { emailId } = req.body;
    try {
        const user = await UserModel.findOne({ emailId });

        if (!user) {
            // We send a generic success message to prevent email enumeration
            return res.status(200).json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false }); // The model method should handle saving the token fields

        // Create reset URL for the frontend
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
        console.log(`Reset URL: ${resetUrl}`);
        await sendPasswordResetEmail(user, resetUrl);

        res.status(200).json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(200).json({ success: true, message: 'If a user with that email exists, a reset link has been sent.' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    // Get hashed token
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    try {
        const user = await UserModel.findOne({
            passwordResetToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = await bcrypt.hash(req.body.password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.reseted_status = 0; // Reset status on successful password change
        user.reset_count = (user.reset_count || 0) + 1; // Increment the reset counter

        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;