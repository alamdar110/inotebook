const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Define routes using the router

router.post('/', async(req, res) => {
    try {
        // Create a new user instance with data from the request body
        const user = new User(req.body);
        // Save the user to the database
        await user.save();
        res.json("Form Submitted");
    } catch (error) {
        // If there's an error, send an error response
        res.status(500).json({ error: error.message });
    }
});

// Export the router
module.exports = router;