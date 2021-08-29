const jwt = require('jsonwebtoken');

exports.genJWTToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
