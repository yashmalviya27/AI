const userData = require('../models/auth.model');
const jwt = require('jsonwebtoken');


async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Token not found in cookies'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userData.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        next(); 
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Invalid token. Please login again'
        });
    }
}

module.exports = authMiddleware;
