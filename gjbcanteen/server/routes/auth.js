const express=require('express')
const router=express.Router();
// const { setUsername, setPassword } = require("../../src/store/actions.mjs");
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const secret = process.env.JWT_SECRET;

const User=require('../Models/UserModel')
router.post('/register',async(req,res)=>{
    const{email,username,password}=req.body;
    
try{
        const existingUser=await User.findOne({email}).exec();
        // console.log(existingUser);
        const existingUsername=await User.findOne({username}).exec();
        // console.log(existingUsername);
        if(existingUser || existingUsername)
        {
            return res.status(400).json({message:'user  already registered'});
        }
        else if (existingUsername) {
          return res.status(400).json({ message: 'Username already taken' });
        } else {
        //create user 
              const hashedPassword = await bcrypt.hash(password, 10);
              const user=new User({email,username,password:hashedPassword});
              //save user to database
              await user.save();
              return res.status(201).json({message:'Registration success'});
    }
  }
    catch(error){
        console.log(error);
        res.status(500).json({message:'server error'})
    }
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if(!user){
      return res.status(400).json({message:'Invalid credentials'})
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:'Invalid password'});
    }
    const token=jwt.sign({id:user._id,username:user.username},secret,{ expiresIn: '1h' });
    res.json({token});
    const actionsModule=await import("../../src/store/actions.mjs");
    const {setUsername,setPassword}=actionsModule;
    req.app.get('store').dispatch(setUsername(username));
    req.app.get('store').dispatch(setPassword(password));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }

});


module.exports=router;