const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "jwtrandomsecretkey";
const fetchUser = require('../middleware/fetchUser');
// Define routes using the router

//User Signup
router.post('/create', [
    body('username', 'Enter a valid username').isLength({ min: 3 }).isString(),
    body('email', 'Please provide valid Email').isEmail(),
    body('password', 'Please provide valid Password').isLength({ min: 5 }).isString() // Password must be at least 5 characters long
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
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            // console.log(hash);
            user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            data = {
                user: user.id
            }
            await user.save()
            var token = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({
                token
            });;

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//User Login
router.post('/login', [
    body('useroremail', 'Please provide valid Email').exists(),
    body('password', 'Please provide valid Password').exists()
], async(req, res) => {
    try {
        // return res.status(200).send(JWT_SECRET);
        let user = await User.findOne({
            $or: [
                { username: req.body.useroremail },
                { email: req.body.useroremail }
            ]
        })

        if (user) {

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) {
                success = false
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            data = {
                    user: user.id
                }
                // return res.status(200).send(JWT_SECRET);

            var token = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({
                token
            });;

        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});

//Fetch User
router.post('/fetchuser', fetchUser, async(req, res) => {
    try {
        let user = await User.findById(req.user).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// Export the router
module.exports = router;