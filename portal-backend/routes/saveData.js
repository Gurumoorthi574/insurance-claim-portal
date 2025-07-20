const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserFormDetails = require('../models/formdetails');

router.post('/', async (req, res) => {
    try {
        // 1. Authenticate the user via JWT from cookie
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization denied. No token provided.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Token is not valid.' });
        }

        if (!decoded.email) {
            return res.status(401).json({ success: false, message: 'Token is missing user information.' });
        }

        // 2. Process form data from the request body
        const formData = req.body;
        let status;

        if (formData.referralType === 'no') {
            status = 'Approved';
        } else if (formData.referralType === 'yes') {
            status = 'Pending';
        } else {
            return res.status(400).json({ message: "ReferralType is missing or invalid. Please select 'Yes' or 'No'." });
        }

        // 3. Associate the claim with the logged-in user and set status
        const dataToSave = {
            ...formData,
            emailAddress: decoded.email, // Link claim to user
            status: status,
        };

        const newForm = new UserFormDetails(dataToSave);
        await newForm.save();
        res.status(201).json({ message: 'Form data saved successfully', formId: newForm._id });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Error saving form data', error: error.message });
    }
});

module.exports = router;