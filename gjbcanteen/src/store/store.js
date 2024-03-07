import {applyMiddleware} from 'redux';
import {thunk }from 'redux-thunk';
// import rootReducer from './reducers.js';
import authReducer from './reducers'
import cartReducer from './reducers';
import { combineReducers } from 'redux';
import { legacy_createStore } from 'redux';

const rootReducer=combineReducers({
    authReducer,
    cartReducer,
})


const loggerMiddleware=store=>next=>action=>{
    console.log('dispatching',action);
    console.log('previous state',store.getState());
    const result=next(action);
    console.log('next state',store.getState());
    return result;
}
const store=legacy_createStore(rootReducer,
    applyMiddleware(thunk,loggerMiddleware)
);

export default store;