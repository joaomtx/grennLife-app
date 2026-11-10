const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const match = typeof authHeader === 'string' && authHeader.match(/^Bearer\s+(.+)$/i);

    if (match) {
        try {
            req.user = jwtConfig.verifyToken(match[1]);
        } catch (error) {
            req.user = null;
        }
    }

    next();
};
