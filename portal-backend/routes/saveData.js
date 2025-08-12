const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserFormDetails = require('../models/formdetails');
const usermanagement = require('../models/userslogin');

router.post('/', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization denied. No token provided.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Token is not valid.' });
        }

        // Assuming 'type' is in the JWT payload, like 'email'
        if (!decoded.email || !decoded.userType) {
            return res.status(401).json({ success: false, message: 'Token is missing user information.' });
        }
        const generatePolicyNumber = () => {
            const prefix = 'H-';
            let digits = '';
            for (let i = 0; i < 10; i++) {
            digits += Math.floor(Math.random() * 10);
            }
            console.log("Generated policy number:", `${prefix}${digits}`);
            return `${prefix}${digits}`;
        };
        
        const newPolicyNumber = generatePolicyNumber();

        // 2. Process form data from the request body
        const { email, policyNumber, ...formData } = req.body;
        const createdBy = decoded.email;
        let assignedTo;

        if (decoded.userType === 'admin') {
            assignedTo = createdBy;
        } else {
            if (formData.referralType === 'no') {
                assignedTo = createdBy;
                status = 'pending'
            } else if (formData.referralType === 'yes') {
                const adminUser = await usermanagement.findOne({ userType: 'admin' });
                if (!adminUser) {
                    return res.status(400).json({ message: "No admin user found to assign the claim." });
                }
                assignedTo = adminUser.emailId;
            } else {
                return res.status(400).json({ message: "ReferralType is missing or invalid. Please select 'Yes' or 'No'." });
            }
        }
        const status = (assignedTo !== createdBy) ? 'Referred' : 'Approved';

        // 3. Associate the claim with the correct user email
        const emailToSave = (decoded.userType === 'admin' && email) ? email : createdBy;

        const dataToSave = {
            ...formData,
            policyNumber: newPolicyNumber,
            createdBy: createdBy,
            assignedTo: assignedTo,
            emailAddress: emailToSave,
            status: status,
        };

        const newForm = new UserFormDetails(dataToSave);
        await newForm.save();
        res.status(201).json({ message: 'Form data saved successfully', formId: newForm._id, policyNumber: newPolicyNumber });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Error saving form data', error: error.message });
    }
});

module.exports = router;