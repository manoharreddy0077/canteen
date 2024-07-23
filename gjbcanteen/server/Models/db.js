const mongoose =require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;

mongoose.connect(mongoDBURL);




const mongooseConection=mongoose.connection;

mongooseConection.on('error',
    console.error.bind(console,'MongoDB connection error : '));
    mongooseConection.once('open',()=>{
        console.log('connected to mongodb')
});

module.exports=mongoose