const express=require('express');
const router=express.Router();

const Order=require('../Models/Orders');

router.post('/recentOrders',async(req,res)=>{
    const username=req.body.username;
    console.log(req.body.username);
    try{
        const orders=await Order.find({username:username})
        .limit(3);

        res.json(orders);

        // console.log(orders[0].cartDetails);
        console.log("orders",[orders]);
    }catch(error){
        console.error('Error fetching data:',error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;