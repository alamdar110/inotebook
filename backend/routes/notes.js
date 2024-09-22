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
                tag: req.body.tag ? req.body.tag : "general",
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

//Update notes
router.put('/updatenotes/:id', fetchUser, async(req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user_id.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (err) {
        console.error(err);
        res.status(500).json("Server Error");
    }
});

//Delete note
router.delete('/deletenotes/:id', fetchUser, async(req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user_id.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", "note": note });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

// Export the router
module.exports = router;