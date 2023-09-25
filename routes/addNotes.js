const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')
const Notes = require("../models/Notes")

//add notes : Login Required
router.post('/',fetchUser,[
    body('title','Enter a valid title').isLength({ min : 3 }),
    body('description','Enter a valid description').isLength({ min : 5 }),
],async(req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors : result.array()});
     }
     let {title , description , tag} = req.body;
     try {
        const notes = new Notes({
           title , description , tag , user : req.user.id
        })
        const savedNotes = await Notes.create(notes);
        res.json(savedNotes);
     } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
     }
     
   }
   )
       module.exports = router