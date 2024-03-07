const express=require('express');
const cors=require('cors')
const app=express();
const port=3001;


app.use(express.json()); 
app.use(cors());

const db=require('../server/Models/db')
const User=require('./Models/UserModel');

const redux=require("redux");
const rootReducer=require('../src/store/reducers.js');
const createStore=redux.legacy_createStore;
const store=createStore(rootReducer);

app.set('store',store);
const authRouter=require('./routes/auth');
const menuRouter=require('./routes/MenuList')


const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use('/api',authRouter);
app.use('/api',menuRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})


