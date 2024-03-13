const express=require('express');
const router=express.Router();

router.post('/processCart',async(req,res)=>{
    console.log('iam here')
    console.log(req.body)
    const itemsByCanteen=req.body;

    const insufficientItems=[];

    for(const canteen in itemsByCanteen){
        for(const item of itemsByCanteen[canteen]){
            if(item.Quantity < item.quan){
                insufficientItems.push({item, canteen});
            }
        }
    }
    console.log(insufficientItems)
    if(insufficientItems.length === 0){
        res.status(200).send('All items have sufficient quantity');
    }else{
        res.status(400).json({insufficientItems});
    }
});

module.exports=router;