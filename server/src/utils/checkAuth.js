const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config.js');

// authentication middleware
module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // Bearer ....token
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                const user = jwt.verify(token, SECRET)
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid or expired token');
            }
        }
        throw new Error('Authentication token must be "Bearer [token]"');
    }
    throw new Error('Authorization header must be provided');
};