const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser");
const Notes = require('../models/Notes');

router.get('/',fetchUser,async(req,res) => {
try {
    
    const notes = await Notes.find({user : req.user.id});
 res.json(notes);

} catch (error) {
        
    console.log(error);
    res.status(500).send("Internal Server Error");    
} 


}
)
    module.exports = router