const express = require('express')
const router = express.Router()
const User = require("../models/user")
const List = require("../models/list")
//Add note
router.post("/create", async(req, res)=>{
    try{
    const {title, body, email} = req.body;
    const existingUser =  await User.findOne({email});
    if(existingUser){
        const list = new List({title, body, user: existingUser});
        await list.save().then(()=> res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
      }
      else{
        res.status(400).json({message: "Log in First"})
      }
    } catch(error){
        console.log(error);
    }
})
//Update note
router.put("/update/:id", async(req, res)=>{
    try{
    const {title, body, email} = req.body;
    const existingUser =  await User.findOne({email});
    if(existingUser){
       const list = await List.findByIdAndUpdate(req.params.id, {title, body});
       list.save().then(() => res.status(200).json({message: "Task updated"}));
      }
      else{
        res.status(400).json({message: "Log in First"})
      }
    } catch(error){
        console.log(error);
    }
})
//delete note
router.delete("/delete/:id", async(req, res)=>{
    try{
    const {email} = req.body;
    const existingUser = await User.findOneAndUpdate({email},{$pull: {list: req.params.id}});
    if(existingUser){
        await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({message: "Task delete"})
        );
      }
    } catch(error){
        console.log(error);
    }
})

//read/fetch note
router.get("/read/:id", async(req, res)=> {
        const list = await List.find({user: req.params.id}).sort({createdAt: -1});
        if(list.length!==0){
            res.status(200).json({list: list});
        } else{
            res.status(200).json({"message": "No Tasks"});
        }
});

module.exports = router;