const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Define routes using the router

router.post('/create', [
    body('username', 'Enter a valid username').isLength({ min: 3 }).isString(),
    body('email', 'Please provide valid Email').isEmail(),
    body('password', 'Please provide valid Password').isLength({ min: 6 }).isString() // Password must be at least 6 characters long
], async(req, res) => {
    try {
        let user = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })

        if (user) {
            return res.status(400).send("User already exists");
        } else {

        }

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            await user.save();
            return res.status(200).json({ message: "User created successfully", user }); // Include user data in the response
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Export the router
module.exports = router;