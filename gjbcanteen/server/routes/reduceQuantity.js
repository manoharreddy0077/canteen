const express=require('express');
const router=express.Router();

const C1Menu=require('../Models/C1MenuList');
const C2Menu=require('../Models/C2MenuList');
const C3Menu=require('../Models/C3MenuList');

router.post('/reduceQuantity',async(req,res)=>{
    console.log('iam gere rrr')
    try{
        const itemsByCanteen=req.body;
        for(const canteen in itemsByCanteen){

            let MenuModel;
            switch(canteen){
                case 'C1':
                    MenuModel=C1Menu;
                    break;
                case 'C2':
                    MenuModel=C2Menu;
                    break;
                case 'C3':
                    MenuModel=C3Menu;
                    break;
                default:
                    throw new Error(`Invalid canteen :${canteen}`);
            }
            for(const item of itemsByCanteen[canteen]){
                const menuItem=await MenuModel.findById(item._id);
                // console.log(menuItem);
                if(menuItem){
                    menuItem.Quantity -= item.quan;
                    await menuItem.save();
                    // console.log('reduced quantity');
                }
            }
        }
        res.status(200).send({message:'Quantity reduces successfully'});
    }catch(error){
        console.error('Error reducing quantity',error);
        res.status(500).send({error:'Failed to reduce quantity'});
    }
    
})

module.exports=router;