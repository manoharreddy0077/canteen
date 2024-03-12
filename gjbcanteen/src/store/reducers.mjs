import { combineReducers } from 'redux';
import { SET_USERNAME, SET_PASSWORD, ADD_TO_CART, REMOVE_FROM_CART } from "./actions.mjs";

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
            const existingItem = state.find((cartItem) => cartItem.Item === action.payload.Item && cartItem.canteen === action.payload.canteen);
            if (existingItem) {
                // If item exists, update quantity
                return state.map((cartItem) =>
                    cartItem.Item === existingItem.Item && cartItem.canteen === action.payload.canteen ? { ...cartItem, quan: cartItem.quan + 1 } : cartItem
                );
            } else {
                // If item doesn't exist, add it to cart with quantity 1
                return [...state, { ...action.payload, quan: 1 }];
            }
            case REMOVE_FROM_CART:
                // console.log("in remove cart ")
                return state.map((cartItem) =>
                    cartItem.Item === action.payload.Item && cartItem.canteen === action.payload.canteen ? { ...cartItem, quan: cartItem.quan - 1 } : cartItem
                ).filter((cartItem) => cartItem.quan > 0);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;

