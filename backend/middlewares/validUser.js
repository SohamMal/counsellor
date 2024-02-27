const jwt=require('jsonwebtoken');
const {secret}=require('./../../secret/config');

async function validUser(req, res, next) {
    const token = req.headers.token;
    try {
        if (!token) {
            res.status(401).json({ msg: "Token is missing" });
        }
        const value = await jwt.verify(token, secret);
        if (value) {
            req.user_id = value.user_id;
            next();
        } else {
            res.status(403).json({ msg: "Authentication Error" });
        }
    } catch (e) {
        console.error(e);
        res.status(403).json({ 
            msg: "Error in validUser" 
        });
    }
}

module.exports={
    validUser
}