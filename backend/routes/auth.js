const express = require('express');
const router = express.Router();
// Define routes using the router


router.get('/', (req, res) => {
    res.send('Hello Alamdar!')

    obj = {
        a: 'thios',
        number: 34
    }
    res.json(obj)
});

// Export the router
module.exports = router;