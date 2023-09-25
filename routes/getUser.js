const express = require('express');
const router = express.Router();
const User = require('../models/User')
const fetchUser = require("../middleware/fetchUser")

var jwt = require('jsonwebtoken')

const JWT_KEY = "@$#^^*~"

router.post('/',fetchUser, async(req,res) => {
    try {
    
        let user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        
        console.log("Some error occured");
        res.status(500).send("Internal Server Error");       
    }
    
}
)
module.exports = router