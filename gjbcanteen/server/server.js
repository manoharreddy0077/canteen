// const express=require('express');
// const cors=require('cors')
// const app=express();
// const port=3001;


// app.use(express.json()); 
// app.use(cors());

// const db=require('../server/Models/db')
// const User=require('./Models/UserModel');

// const redux=require("redux");
// const rootReducerPromise = import('../src/store/reducers.mjs');
// const createStore=redux.legacy_createStore;
// const store=createStore(rootReducer);

// app.set('store',store);
// const authRouter=require('./routes/auth');
// const menuRouter=require('./routes/MenuList')


// const bodyParser=require('body-parser');
// app.use(bodyParser.json());
// app.use('/api',authRouter);
// app.use('/api',menuRouter);

// app.listen(port,()=>{
//     console.log(`server is running on port ${port}`);
// })


const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = require('../server/Models/db');
const User = require('./Models/UserModel');

const redux = require('redux');
// Use dynamic import for importing ES modules
const rootReducerPromise = import('../src/store/reducers.mjs');
rootReducerPromise.then((module) => {
    const rootReducer = module.default;
    const createStore = redux.legacy_createStore;
    const store = createStore(rootReducer);

    app.set('store', store);
    
    const authRouter = require('./routes/auth');
    const menuRouter = require('./routes/MenuList');
    const processCartRouter=require('./routes/processCart')

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use('/api', authRouter);
    app.use('/api', menuRouter);
    app.use('/api', processCartRouter);
    
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error importing reducers.mjs:', error);
});
