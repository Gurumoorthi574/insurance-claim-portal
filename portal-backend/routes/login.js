const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET || 'default_dev_secret';

router.post('/', async (req, res) => {
    try {
        const { userId, emailId, password } = req.body;
        console.log('Login request received:', req.body);

        let foundUser;

        // Try to find user by userId (for admin)
        if (userId) {
            foundUser = await UserModel.findOne({ userId });
            if (!foundUser) {
                return res.status(400).send('Invalid User ID or password');
            }
            if (foundUser.userType !== 'admin') {
                return res.status(400).send('User ID login allowed only for admin users');
            }
        }
        // Try to find user by emailId (for client)
        else if (emailId) {
            foundUser = await UserModel.findOne({ emailId });
            if (!foundUser) {
                return res.status(400).send('Invalid Email ID or password');
            }
            if (foundUser.userType !== 'user') {
                return res.status(400).send('Email login allowed only for client users');
            }
        } else {
            return res.status(400).send('User ID or Email ID and password are required');
        }

        // Compare the plain password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ u_id: foundUser.userId, email: foundUser.emailId, role: foundUser.userType }, jwtSecret, { expiresIn: '30m' });
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
                userId: foundUser.userId,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                emailId: foundUser.emailId,
                userType: foundUser.userType
            }
        });

    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
});


module.exports = router;