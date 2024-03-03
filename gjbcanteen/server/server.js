const express=require('express');
const cors=require('cors')
const app=express();
const port=3001;
app.use(express.json());
app.use(cors());

const User=require('./Models/UserModel');

