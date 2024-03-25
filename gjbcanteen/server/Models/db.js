const mongoose =require('mongoose');

// mongoose.connect('mongodb://localhost:27017/seproject')
mongoose.connect('mongodb+srv://manohar:1739Manohar@cluster0.mgyztqp.mongodb.net/gjb');




const mongooseConection=mongoose.connection;

mongooseConection.on('error',
    console.error.bind(console,'MongoDB connection error : '));
    mongooseConection.once('open',()=>{
        console.log('connected to mongodb')
});

module.exports=mongoose