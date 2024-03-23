const express=require('express');
const router=express.Router();
const redisClient=require('../redisClient');

router.get('/redisData',async(req,res)=>{
    try{
        const redisData=await redisClient.getAsync('rediskey');

        const parseData=JSON.parse(redisData);
        res.json(parseData);
    }catch(error){
        console.error('Error fetching Redis data',error);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;