const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserFormDetails = require('../../models/formdetails');

router.get('/:policyNumber', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Token is not valid' });
        }

        if (!decoded.email) {
            return res.status(401).json({ success: false, message: 'Token is missing user information' });
        }

        const policyNumber = req.params.policyNumber;
        // Find by 'policyNumber' and ensure it belongs to the logged-in user
        const claim = await UserFormDetails.findOne({ policyNumber: policyNumber, emailAddress: decoded.email });
        if (!claim) {
            // Return 404 to avoid revealing that the claim exists but belongs to another user
            return res.status(404).json({ message: 'Claim not found' });
        }
        res.status(200).json(claim);
    } catch (error) {
        console.error('Error fetching claim by policy number:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;