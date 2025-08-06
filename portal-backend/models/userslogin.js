const mongoose = require('mongoose');

const usermanagementSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });
module.exports = mongoose.model('usermanagement', usermanagementSchema);