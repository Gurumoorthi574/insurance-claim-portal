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
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Access is restricted to administrators.' });
    }

    // Fetch all claims from the database, not filtered by user
    // Use .lean() for better performance on read-only queries
    const claims = await UserFormDetails.find({}).sort({ createdAt: -1 }).lean();

    // Return the full claim objects instead of a formatted subset
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    console.error('Server error in /api/fetch/claim-history:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;