const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userprofile = require('../models/userlogin');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;
const jwtSecret = process.env.JWT_SECRET || 'default_dev_secret';

router.post('/', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        console.log('Login request received:', req.body);
        if (!emailId || !password) {
            return res.status(400).send('Email and password are required');
        }
        const user = await userprofile.findOne({ emailId });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        // Compare the plain password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        const token = jwt.sign({ email: user.emailId }, jwtSecret, { expiresIn: '30m' });
        res.cookie('token', token, {
            httpOnly: true, // The cookie is not accessible via client-side script
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // Helps mitigate CSRF attacks
            maxAge: 30 * 60 * 1000 // 30 minutes, same as your JWT expiration
        });

        res.status(200).json({ success: true, userId: user._id });
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
});


module.exports = router;