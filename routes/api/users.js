const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const User = require('../../models/User');

// Test api
router.get('/test', (req, res) => res.json({"name": "User test"}));

// @route   GET api/usrs/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
            }
        })
});

module.exports = router;