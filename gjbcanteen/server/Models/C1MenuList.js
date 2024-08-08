const mongoose=require('mongoose');

const C1MenuSchema=new mongoose.Schema({
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

const C1MenuList=mongoose.model('C1MenuList',C1MenuSchema);
module.exports=C1MenuList;