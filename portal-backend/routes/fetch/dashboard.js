const express = require('express');
const router = express.Router();
const UserFormDetails = require('../../models/formdetails');
const jwt = require('jsonwebtoken');

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

        const query = {};
        const aggregationPipeline = [];

        // If the user is not an admin, filter claims by their email.
        if (decoded.role !== 'admin') {
            if (!decoded.email) {
                return res.status(401).json({ success: false, message: 'Token is missing user email information' });
            }
            query.emailAddress = decoded.email;
            // Also filter the aggregation for counts
            aggregationPipeline.push({ $match: { emailAddress: decoded.email } });
        }
        // For admin users, the query and pipeline remain unfiltered to fetch all data.

        // Add the grouping stage to the aggregation pipeline
        aggregationPipeline.push({
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        });

        // Fetch all claim data and calculate status counts efficiently in parallel
        const [dashboardData, statusCountsResult] = await Promise.all([
            UserFormDetails.find(query).sort({ createdAt: -1 }).lean(), // .lean() for faster read-only queries
            UserFormDetails.aggregate(aggregationPipeline)
        ]);

        const counts = statusCountsResult.reduce((acc, status) => {
            if (status._id) acc[status._id.toLowerCase()] = status.count;
            return acc;
        }, { pending: 0, approved: 0, rejected: 0 });

        res.status(200).json({
            data: dashboardData,
            pendingCount: counts.pending,
            approvedCount: counts.approved,
            rejectedCount: counts.rejected
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send({ message: 'Error fetching dashboard data', error: error.message });
    }
});
module.exports = router;