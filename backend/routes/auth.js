const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Define routes using the router

router.post('/', [
    body('username', 'Enter a valid username').isLength({ min: 3 }).isString(),
    body('email', 'Please provide valid Email').isEmail(),
    body('password', 'Please provide valid Password').isLength({ min: 6 }).isString() // Password must be at least 6 characters long
], async(req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } else {
        const user = new User(req.body);
        await user.save({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password

        }).then((data) => {
            res.json("Form Submitted");
        }).catch((error) => {
            res.status(500).json({ error: error.errorResponse.errmsg });
        });
    }
});

// Export the router
module.exports = router;