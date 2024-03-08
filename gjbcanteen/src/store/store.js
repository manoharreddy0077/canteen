import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import { combineReducers } from 'redux';
import rootReducer from './reducers';

const loggerMiddleware = store => next => action => {
    console.log('dispatching', action);
    console.log('previous state', store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    return result;
};

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export default store;
