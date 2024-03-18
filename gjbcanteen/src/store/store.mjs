import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import { combineReducers } from 'redux';
import rootReducer from './reducers.mjs';


const saveStateMiddleware=store=>next=>action=>{
    const result=next(action);

    localStorage.setItem('reduxState',JSON.stringify(store.getState()));
    return result;
}


const loadState=()=>{
    try{
        const serializedState=localStorage.getItem('reduxState');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined;
    }
};

const persistedState=loadState();

const loggerMiddleware = store => next => action => {
    console.log('dispatching', action);
    console.log('previous state', store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    return result;
};

const store = createStore(rootReducer,persistedState,applyMiddleware(loggerMiddleware,saveStateMiddleware));

export default store;
