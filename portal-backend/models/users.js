const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'user'], // Example user types
        default: ''
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    reseted_status: {
        type: Number,
        default: 0
    },
    reset_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

userSchema.methods.getResetPasswordToken = function() {

    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    
    this.passwordResetExpires = Date.now() + 5 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('users', userSchema);