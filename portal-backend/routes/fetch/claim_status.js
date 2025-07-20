const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserFormDetails = require('../../models/formdetails');

router.get('/', async (req, res) => {
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

        const totalCount = await UserFormDetails.countDocuments({ emailAddress: decoded.email });
        const pendingCount = await UserFormDetails.countDocuments({ emailAddress: decoded.email, status: 'Pending' });
        const approvedCount = await UserFormDetails.countDocuments({ emailAddress: decoded.email, status: 'Approved' });
        const rejectedCount = await UserFormDetails.countDocuments({ emailAddress: decoded.email, status: 'Rejected' });

        res.json({data: totalCount,
            pendingCount: pendingCount,
            approvedCount: approvedCount,
            rejectedCount: rejectedCount
        });

    } catch (error) {
        console.error('Error fetching claim status data:', error);
        res.status(500).send({ message: 'Error fetching claim status data', error: error.message });
    }
});
module.exports = router;
