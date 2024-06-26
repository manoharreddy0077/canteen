


import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers.mjs';

// Middleware to save Redux state to local storage
const saveStateMiddleware = store => next => action => {
    const result = next(action);
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    return result;
};

// Middleware to log Redux actions and state changes
const loggerMiddleware = store => next => action => {
    console.log('dispatching', action);
    console.log('previous state', store.getState());
    const result = next(action);
    console.log('next state', store.getState());
    return result;
};

// Function to load persisted state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Load persisted state from local storage
const persistedState = loadState();

// Create Redux store with persisted state and middleware
const store = createStore(rootReducer, persistedState, applyMiddleware(loggerMiddleware, saveStateMiddleware));

export default store;
