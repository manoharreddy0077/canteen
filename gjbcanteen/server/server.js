const express=require('express');
const cors=require('cors')
const app=express();
const port=3001;
app.use(express.json());
app.use(cors());
const db=require('../server/Models/db')
const User=require('./Models/UserModel');
const store=createStore();

app.set('store',store);
const authRouter=require('./routes/auth');

app.use('/api',authRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});


