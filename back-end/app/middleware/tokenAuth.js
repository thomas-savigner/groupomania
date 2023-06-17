const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Set up Global configuration access
dotenv.config();
let jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];

        const checkToken = jwt.verify(token, jwtSecretKey, (err, verifiedJwt) => {
            if (err) {
                res.send(err.message)
            } else {
                return verifiedJwt;
            }
        });

        const tokenUserId = checkToken.userId;

        //  defining auth object in req with userID obtained with decoded token
        req.auth = {tokenUserId};

        if (req.body.userID && req.body.userID !== tokenUserId) {
            throw "invalid token"
        } else {
            next()
        }
    } catch (error) {
        // Access Denied
        res.status(401).send(error);
    }
}