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

        const userEmail = decoded.email;

        // Use a single aggregation to get all counts efficiently
        const statusCountsResult = await UserFormDetails.aggregate([
            { $match: { emailAddress: userEmail } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const counts = statusCountsResult.reduce((acc, status) => {
            if (status._id) acc[status._id.toLowerCase()] = status.count;
            return acc;
        }, { pending: 0, approved: 0, rejected: 0 });

        const totalCount = counts.pending + counts.approved + counts.rejected;

        res.json({
            data: totalCount,
            pendingCount: counts.pending,
            approvedCount: counts.approved,
            rejectedCount: counts.rejected
        });

    } catch (error) {
        console.error('Error fetching claim status data:', error);
        res.status(500).send({ message: 'Error fetching claim status data', error: error.message });
    }
});
module.exports = router;
