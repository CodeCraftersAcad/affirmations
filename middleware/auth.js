const jwt = require('jsonwebtoken'),
    User = require('../models/UserSchema');

exports.auth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.id).select('-password');
            next();
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized');
    }
}

exports.isAdminCheck = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else {
        res.status(401);
        throw new Error('Not Authorized for this page');
    }
}