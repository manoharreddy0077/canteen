const mongoose =require('mongoose');

// mongoose.connect('mongodb://localhost:27017/seproject')
mongoose.connect('mongodb://127.0.0.1:27017/gjb');




const mongooseConection=mongoose.connection;

mongooseConection.on('error',
    console.error.bind(console,'MongoDB connection error : '));
    mongooseConection.once('open',()=>{
        console.log('connected to mongodb')
});

module.exports=mongoose