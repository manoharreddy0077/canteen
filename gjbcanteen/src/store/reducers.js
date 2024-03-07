// const {combineReducers} = require("redux");
const redux=require('redux');
const combineReducers=redux.combineReducers;
const { SET_USERNAME, SET_PASSWORD, ADD_TO_CART, UPDATE_CART_ITEM } = require("./actions.js");

const initialState = {
    username: '',
    password: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.payload };
        case SET_PASSWORD:
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.find((cartItem) => cartItem.item === action.payload.item);
            if (existingItem) {
                // If item exists, update quantity
                return state.map((cartItem) =>
                    cartItem.item === existingItem.item ? { ...cartItem, quan: cartItem.quan + 1 } : cartItem
                );
            } else {
                // If item doesn't exist, add it to cart with quantity 1
                return [...state, { ...action.payload, quan: 1 }];
            }
        case UPDATE_CART_ITEM:
            return state.map((cartItem) =>
                cartItem.item === action.payload.item ? { ...cartItem, quan: cartItem.quan + 1 } : cartItem
            );
        default:
            return state;
    }
};

// const rootReducer = combineReducers({
//     auth: authReducer,
//     cart: cartReducer,
// });

// module.exports = rootReducer;
module.exports=authReducer,cartReducer;

