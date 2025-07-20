const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const UserFormDetails = require('../../models/formdetails');



router.get('/', async (req, res) => {
  try {
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //   return res.status(401).json({ success: false, message: 'Token is not valid' });
    // }
    
    // if (!decoded.email) {
    //   return res.status(401).json({ success: false, message: 'Token is missing user information' });
    // }
    // Fetch all claims from the database, not filtered by user
    const claims = await UserFormDetails.find({}).sort({ createdAt: -1 });

    const formattedClaims = claims.map(claim => ({
      _id: claim._id,
      policyNumber: claim.policyNumber,
      title: claim.typeOfVisit,
      dateOfIncident: claim.dateOfIncident || claim.dateOfIllness,
      dateSubmitted: claim.createdAt,
      status: claim.status,
    //   lastUpdated: claim.updatedAt,
    }));

    res.status(200).json({ success: true, data: formattedClaims });
  } catch (error) {
    console.error('Server error in /api/fetch/claim-history:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;