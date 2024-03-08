const express=require('express');
const router=express.Router();
const C1MenuList=require('../Models/C1MenuList');
const C2MenuList=require('../Models/C2MenuList');
const C3MenuList=require('../Models/C3MenuList');

router.post('/MenuList',async(req,res)=>{
    // console.log(req.body);
    const {canteen}=req.query;
    console.log("entered here")
    console.log(canteen);
    // console.log(canteen);

    try{
        let collection;
        switch(canteen){
            case 'C1Menu':
                collection=C1MenuList;
                break;
            case 'C2Menu':
                collection=C2MenuList;
                break;
            case 'C3Menu':
                collection=C3MenuList;
                break;
            default:
                return res.status(400).json({error:'Invalid canteen_name'});
        }
        const documents=await collection.find();
        res.status(200).json(documents);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'An error occured while retriving'})
    }
});

module.exports=router;