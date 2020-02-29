// this middleware just takes the user that already register.

const jwt = require('jsonwebtoken');
const config = require('config');

// its a middleware function so it take three args
// middleware function is basically just a function that has access to the request and response cycle
// next is a callback that we have to run once we are done 
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token'); // x-auth-token basically the key that we want to send along that we want send the token

    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // verify token
    try{
        // in jwt verify is the method which takes two things header key and SecretKey
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // requset user(login user) = decoded.user(that is in database)
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: "Token is not valid" });
    }

}