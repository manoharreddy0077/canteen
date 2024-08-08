const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    cartDetails:{
        type:Object,
        required:true
    },
    orderNumber:{
        type:Number,
        required:true
    },
});

const Order=mongoose.model('Order', orderSchema);

module.exports=Order;
