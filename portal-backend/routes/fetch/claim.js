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
        

        const { policyNumber } = req.params
        const query = { policyNumber }
        
        //const query = { policyNumber: policyNumber };
        // If the user is not an admin, they can only view their own claims.
        if (decoded.role !== 'admin') {
            query.emailAddress = decoded.email;
        }

        // Use .lean() for better performance on read-only queries
        const claim = await UserFormDetails.findOne(query).lean();

        if (!claim) {
            const message = decoded.role === 'admin'
                ? 'Claim not found.'
                : 'Claim not found or you do not have permission to view it.';
            return res.status(404).json({ success: false, message });
        }
        // Wrap the response in the format the frontend expects
        res.status(200).json({ success: true, data: claim });
    } catch (error) {
        console.error('Error fetching claim by policy number:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;