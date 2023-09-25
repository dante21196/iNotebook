const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken')

const JWT_KEY = "@$#^^*~"

router.post('/',[
    body('email','Enter a Valid Email!').isEmail(),
    body('password','Password cannot be blank').exists(),

],async(req,res) => {
    const result = validationResult(req);
    //if there are errors return bad request
    if(!result.isEmpty()){
       return res.status(400).json({errors : result.array()});
    }
   let {email,password} = req.body;
  try{
    let user1 = await User.findOne({email});
    if(!user1){
     return res.status(400).json({error : "Please enter valid credentials"})
        
    }
    const passComp = await bcrypt.compare(password,user1.password);
    if(!passComp){
        return res.status(400).json({error : "Please enter valid credentials"})
       
    }
    else
    {
        const data = {
            user : {
            id : user1.id
            }
        }
      authtoken = jwt.sign(data,JWT_KEY);
        res.status(200).json({authtoken : authtoken});
    
    }
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error!")
  }
    
}
)


    module.exports = router