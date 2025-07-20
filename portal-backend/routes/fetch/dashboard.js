const express = require('express');
const router = express.Router();
const UserFormDetails = require('../../models/formdetails');

router.get('/', async (req, res) => {
    try {
        // Fetch all claim data, not filtered by user
        const dashboardData = await UserFormDetails.find({}).sort({ createdAt: -1 });

        // Calculate status counts
        const pendingCount = await UserFormDetails.countDocuments({ status: 'Pending' });
        const approvedCount = await UserFormDetails.countDocuments({ status: 'Approved' });
        const rejectedCount = await UserFormDetails.countDocuments({ status: 'Rejected' });

        res.status(200).json({
            data: dashboardData,
            pendingCount: pendingCount,
            approvedCount: approvedCount,
            rejectedCount: rejectedCount
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send({ message: 'Error fetching dashboard data', error: error.message });
    }
});
module.exports = router;