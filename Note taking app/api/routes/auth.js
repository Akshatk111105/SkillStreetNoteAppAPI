const express = require('express')
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');
const emailvalidator = require("email-validator");

//sign in
router.post("/register", async(req, res) => {
    try{
      const{email, username, password} = req.body;
      if(!emailvalidator.validate(email)){
        res.status(400).send('Invalid Email');
        return;
      } 
          const hashpassword = bcrypt.hashSync(password, 10);
          const user = new User({email, username, password:hashpassword}); 
          await user.save().then(()=> res.status(200).json({user: user}));

    } catch(error)
    {
        res.status(400).json({message: "User Already Exists"});
    }
});

//log in
router.post("/login", async(req, res) => {
    try{
      const user = await User.findOne({email: req.body.email});
      if(!user){
        res.status(400).json({message: "Sign Up First"});
        return;
      }
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if(!isPasswordCorrect){
        res.status(400).json({message : "Invalid Credentials"});
        return;
      }
      const {password, ...others} = user._doc; // show me everything except pass
      res.status(200).json({others})
    } catch(error)
    {
        res.status(400).json({message: "Sign Up First"});
    }
});

module.exports = router;