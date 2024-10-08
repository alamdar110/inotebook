require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "jwtrandomsecretkey";
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;