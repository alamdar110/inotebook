const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
// Define routes using the router

//Fetch all notes
router.get('/fetchnotes', fetchUser, async(req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user });
        console.log(notes);
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Write notes
router.post('/writenotes', [
        body('title', 'Enter a valid title').isLength({ min: 3 }).isString(),
        body('description', 'Please provide valid description').isLength({ min: 3 }).isString(),
    ],
    fetchUser, async(req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            const notes = new Notes({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag ? req.body.tag : "General",
                user_id: req.user
            });

            console.log(req.user);
            await notes.save();
            res.json(notes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });

// Export the router
module.exports = router;