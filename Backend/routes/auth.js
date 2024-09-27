const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const router = express.Router();
const JWT_SECRET = 'adam@'; 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        
            
        };
        
        jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' }, (err, token) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ msg: 'JWT Error' });
            }

          
            res.json({ token, role: user.role,id:user._id });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
