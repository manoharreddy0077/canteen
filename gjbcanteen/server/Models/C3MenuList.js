const mongoose=require('mongoose');

const C3MenuSchema=new mongoose.Schema({
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

const C3MenuList=mongoose.model('C3MenuList',C3MenuSchema);
module.exports=C3MenuList;