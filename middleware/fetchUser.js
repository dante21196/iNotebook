var jwt = require('jsonwebtoken')

const JWT_KEY = "@$#^^*~"
const fetchUser = async(req,res,next) =>{
    //get userID from JWT token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error :"Please Authenticate using valid token"});
    }
       try {
        const data = jwt.verify(token, JWT_KEY);
        req.user = data.user
    next();
       } catch (error) {
        res.status(401).send({error :"Please Authenticate using valid token"});
       }
}


module.exports = fetchUser;