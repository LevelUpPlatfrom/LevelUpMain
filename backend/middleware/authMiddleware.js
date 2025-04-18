const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/../.env' });
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    if (!JWT_SECRET) return res.status(500).json({ message: 'Server JWT Secret not configured' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Attach user payload (contains ID)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};