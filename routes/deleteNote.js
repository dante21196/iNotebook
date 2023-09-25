const express = require('express');
const router = express.Router();
//const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const Notes = require("../models/Notes")

router.delete('/:id',fetchUser,async(req,res)=>{
   

    note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not found");
    }
    if(note.user.toString() !== req.user.id ){
        res.status(401).send("Not Allowed");
    }

     note =await Notes.findByIdAndDelete(req.params.id)
     res.json({note : note});
})

 module.exports = router