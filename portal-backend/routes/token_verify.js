const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());

router.get('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided', token: token });
    }
    else{
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ message: 'Token is valid', userId: decoded });
        } catch (error) {
            return res.status(401).json({ message: 'Token expired' });
            
        }
    }

});

module.exports = router;