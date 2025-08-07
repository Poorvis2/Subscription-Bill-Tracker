// In your server/routes/subscriptions.js or similar file

const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription'); // Your Mongoose model
const auth = require('../middleware/auth'); // Your authentication middleware

// @route   GET api/subscriptions
// @desc    Get all subscriptions for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user.id }).sort({ date: -1 });
        res.json(subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});