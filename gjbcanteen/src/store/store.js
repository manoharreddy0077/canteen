import {createStore,applyMiddleware} from 'redux';
import {thunk }from 'redux-thunk';
import rootReducer from './reducers';
 // Correct

const loggerMiddleware=store=>next=>action=>{
    console.log('dispatching',action);
    console.log('previous state',store.getState());
    const result=next(action);
    console.log('next state',store.getState());
    return result;
}

const store=createStore(rootReducer,
    applyMiddleware(thunk,loggerMiddleware)
);



export default store;