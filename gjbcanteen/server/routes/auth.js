const express=require('express')
const router=express.Router();
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
              const user=new User({email,username,password});
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

const {setUsername,setPassword}=require('../../src/store/actions');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginUser = await User.findOne({ username }).exec();

    if (!loginUser || loginUser.password !== password) {
      // Send an alert that the credentials are incorrect
      res.status(401).json({ message: 'Incorrect credentials' });
      return;
    }
    // Login successful
    res.status(200).json({ message: 'Login success' });
    req.app.get('store').dispatch(setUsername(username));
    req.app.get('store').dispatch(setPassword(password));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports=router;