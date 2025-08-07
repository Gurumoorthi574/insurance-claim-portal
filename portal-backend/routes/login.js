const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usermanagement = require('../models/userslogin');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET || 'default_dev_secret';

router.post('/', async (req, res) => {
    try {
        const { userId, emailId, password } = req.body;
        console.log('Login request received:', req.body);

        let user;

        // Try to find user by userId (for admin)
        if (userId) {
            user = await usermanagement.findOne({ userId });
            if (!user) {
                return res.status(400).send('Invalid User ID or password');
            }
            if (user.userType !== 'admin') {
                return res.status(400).send('User ID login allowed only for admin users');
            }
        }
        // Try to find user by emailId (for client)
        else if (emailId) {
            user = await usermanagement.findOne({ emailId });
            if (!user) {
                return res.status(400).send('Invalid Email ID or password');
            }
            if (user.userType !== 'user') {
                return res.status(400).send('Email login allowed only for client users');
            }
        } else {
            return res.status(400).send('User ID or Email ID and password are required');
        }

        // Compare the plain password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ u_id: user.userId, email: user.emailId, userType: user.userType }, jwtSecret, { expiresIn: '15m' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "vaild user",
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                userType: user.userType
            }
        });

    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
});


module.exports = router;