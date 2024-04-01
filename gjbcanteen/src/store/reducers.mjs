import { combineReducers } from 'redux';
import { SET_USERNAME, SET_PASSWORD, ADD_TO_CART, REMOVE_FROM_CART,RESET_USERNAME, RESET_PASSWORD ,CLEAR_CART} from "./actions.mjs";

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
        case RESET_USERNAME:
            return {...state,username:''};
        case RESET_PASSWORD:
            return {...state,password:''};
        default:
            return state;
    }
};

const cartReducer = (state = {items:[],total:0}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.items.find((cartItem) => cartItem.Item === action.payload.Item && cartItem.canteen === action.payload.canteen);
            if (existingItem) {
                // If item exists, update quantity
                return {
                    ...state,
                    items:state.items.map((cartItem)=>
                        cartItem.Item===existingItem.Item && cartItem.canteen === action.payload.canteen ? {...cartItem,quan:cartItem.quan+1}:cartItem
                    ),
                    total:state.total+action.payload.Price
                };
            } else {
                // If item doesn't exist, add it to cart with quantity 1
                return {
                    ...state,
                    items:[...state.items,{...action.payload,quan:1}],
                    total:state.total+action.payload.Price
                }
            }
            case REMOVE_FROM_CART:
                // console.log("in remove cart ")
                const updatedCart=state.items.map((cartItem)=>
                    cartItem.Item === action.payload.Item && cartItem.canteen === action.payload.canteen ? {...cartItem,quan:cartItem.quan-1} : cartItem
                );
                const filteredCart=updatedCart.filter((cartItem)=>cartItem.quan > 0);
                const totalPrice=filteredCart.reduce((acc,item)=>acc+item.Price * item.quan,0);
                return {
                    ...state,
                    items:filteredCart,
                    total:totalPrice
                } ;
            case CLEAR_CART:
                return {
                    ...state,
                    items:[],
                    total:0,
                }

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;

