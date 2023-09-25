const express = require('express');
const router = express.Router();
//const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const Notes = require("../models/Notes")

router.put('/:id',fetchUser,async(req,res)=>{
    const {title , description , tag} = req.body;
    //creating a new Note object
    const newNote = {};
    if(title){ newNote.title = title }
    if(description) { newNote.description = description }
    if(tag) { newNote.tag = tag }

    //fidn node and update

   

    note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not found");
    }
    if(note.user.toString() !== req.user.id ){
        res.status(401).send("Not Allowed");
    }

     note =await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new : true})
     res.json(note);
})

 module.exports = router