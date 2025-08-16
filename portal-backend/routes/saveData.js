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

        // The JWT payload contains 'email' and 'role'.
        if (!decoded.email || !decoded.role) {
            return res.status(401).json({ success: false, message: 'Token is missing user information.' });
        }
        const generatePolicyNumber = () => {
            const prefix = 'H-';
            let digits = '';
            for (let i = 0; i < 10; i++) {
                digits += Math.floor(Math.random() * 10);
            }
            return `${prefix}${digits}`;
        };

        const { id, ...formData } = req.body;
        const createdBy = decoded.email;

        if (id) {
            // UPDATE existing claim
            const claim = await UserFormDetails.findById(id);
            if (!claim) {
                return res.status(404).json({ success: false, message: 'Claim not found.' });
            }

            // Security check: only admin or the user it's currently assigned to can update.
            if (decoded.role !== 'admin' && claim.assignedTo !== decoded.email) {
                return res.status(403).json({ success: false, message: 'You do not have permission to update this claim.' });
            }

            // Update the claim fields from the form data
            Object.assign(claim, formData);

            // Admin approval/rejection/remark workflow
            if (decoded.role === 'admin') {
                if (formData.status === 'Rejected') {
                    // When an admin rejects, the claim is "returned" to the user it belongs to.
                    // The status is already 'Rejected' from the formData.
                    claim.assignedTo = claim.emailAddress;
                } else {
                    // Any other update by an admin, including adding a remark, is considered an approval.
                    claim.status = 'Approved';
                    claim.assignedTo = claim.emailAddress; // This makes it appear on the user's dashboard.
                }
            }

            claim.updatedAt = new Date();
            const updatedClaim = await claim.save();

            return res.status(200).json({
                success: true,
                message: 'Claim updated successfully',
                data: updatedClaim
            });

        } else {
            // CREATE new claim
            let assignedTo;
            let status;
            const newPolicyNumber = generatePolicyNumber();

            // The user this claim is for. For admins, it's from the form. For users, it's their own email.
            const emailToSave = (decoded.role === 'admin' && formData.emailAddress) ? formData.emailAddress : createdBy;

            if (decoded.role === 'admin') {
                // If an admin creates a claim for a user, it's auto-approved and assigned to that user.
                assignedTo = emailToSave;
                status = 'Approved';
            } else {
                // If a user creates a claim, it must be reviewed by an admin.
                const adminUser = await usermanagement.findOne({ userType: 'admin' });
                if (!adminUser) {
                    return res.status(500).json({ success: false, message: "No admin user found to assign the claim." });
                }
                assignedTo = adminUser.emailId; // Assign to the first admin found.

                status = formData.referralType === 'yes' ? 'Referred' : 'Pending';
            }

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
            res.status(201).json({ success: true, message: 'Form data saved successfully', formId: newForm._id, policyNumber: newPolicyNumber });
        }
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ success: false, message: 'Error saving form data', error: error.message });
    }
});

module.exports = router;