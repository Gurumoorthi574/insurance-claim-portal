const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userprofile = require('../models/userlogin');

router.post('/', async (req, res) => {
    try{
        const { firstName, lastName, emailId, password } = req.body;

        if (!firstName || !lastName || !emailId || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await userprofile.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userprofile({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
});

module.exports = router;