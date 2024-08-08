const express=require('express');
const router=express.Router();

const Order=require('../Models/Orders');

router.post('/RollUp',async(req,res)=>{
    // console.log("username is ")
    console.log(req.body.username);
    const username=req.body.username;
    try{
        const orders=await Order.find({username:username});
        res.json(orders);
        console.log(orders[0].cartDetails);
        console.log(orders);
    }catch(error){
        console.error('Error fetching data:',error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;