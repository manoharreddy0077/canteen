const express=require('express');
const router=express.Router();

const Order=require('../Models/Orders');


let currentOrderNumber=0;
let currenDate='';

const resetOrderNumber=()=>{
    const today=new Date().toISOString().split('T')[0];
    if(today !== currenDate){
        currenDate=today;
        currentOrderNumber=0;
    }
};



router.post('/storeAndGenerateOrderNo',async(req,res)=>{
    console.log('all ok ')
    console.log(req.body);

    try{
        const {cartItems,username}=req.body;

        resetOrderNumber();

        currentOrderNumber++;

        const order=new Order({
            cartDetails:cartItems,
            username:username,
            orderNumber:currentOrderNumber,
        });

        await order.save();

        res.status(200).send({message:'Order stored successfully',orderNumber:currentOrderNumber});
    }catch(error){
        console.error('Error occurred while storing order:',error);
        res.status(500).send({error:'Failed to store order'});

    }
});

module.exports = router;