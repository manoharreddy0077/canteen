const mongoose=require('mongoose');

const C2MenuSchema=new mongoose.Schema({
    Item:{
        type:String,
        required:true,
        unique:true,
    },
    Price:{
        type:Number,
        required:true,
        unique:false,
    },
    Quantity:{
        type:Number,
        required:true,
    }
})

const C2MenuList=mongoose.model('C2MenuList',C2MenuSchema);
module.exports=C2MenuList;