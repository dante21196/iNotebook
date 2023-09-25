const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

const JWT_KEY = "@$#^^*~"
//Create a user using POST : /api/auth ("Doesnt Require Auth")
router.post('/',[
    body('name','Enter a Valid Name!').isLength({min : 3}),
    body('email','Enter a Valid Email!').isEmail(),
    body('password','Enter a Valid Password!').isLength({min : 8}),

],async(req,res) => {
    const result = validationResult(req);
    //if there are errors return bad request
    if(!result.isEmpty()){
       return res.status(400).json({errors : result.array()});
    }
    try{
    let user1 = await User.findOne({email: req.body.email})
    if(user1)
    {
        console.log(user1);
        return res.status(400).send("Exists");
    }
    const salt =await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password,salt);
    const user =await User.create({
    name : req.body.name,
    email : req.body.email,
    password: secPass,
    notes : []
   }
   )
   
        const data = {
            user:{
                id : user.id
            }
        }
      authtoken = jwt.sign(data,JWT_KEY);
        res.status(200).json({authtoken : authtoken});
 
    }
    catch(error)
    {
        console.log("Some error occured");
        res.status(500).send("Internal Server Error");
    }
}
)
    module.exports = router