import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';

// import { combineReducers } from 'redux';
import rootReducer from './reducers.mjs';

const saveStateMiddleware=store=>next=>action=>{
    const result=next(action);

    localStorage.setItem('reduxState',JSON.stringify(store.getState()));
    return result;
}
const getCurrentUsername = () => {
    // Retrieve authentication state from Redux store
    const authState = store.getState().auth;

    // Check if the user is authenticated
    if (authState.isAuthenticated) {
        // Return the username if the user is authenticated
        return authState.username;
    } else {
        // Return null or an empty string if the user is not authenticated
        return null;
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        const parsedState = JSON.parse(serializedState);
        
        // Get current user's username from the Redux state
        const currentUser = parsedState && parsedState.auth && parsedState.auth.username;
        
        // Get username from your authentication system
        const currentUsername = getCurrentUsername(); // Implement this function to get the current user's username
        
        // Check if the persisted state belongs to the current user
        if (currentUser === currentUsername) {
            return parsedState;
        } else {
            // Return undefined to initialize state with default values
            return undefined;
        }
    } catch (err) {
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
