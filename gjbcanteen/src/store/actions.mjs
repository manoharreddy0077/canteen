export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';

export const setUsername = (username) => ({
    type: SET_USERNAME,
    payload: username,
});

export const setPassword = (password) => ({
    type: SET_PASSWORD,
    payload: password,
});

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

export const removeFromCart=(item)=>({
    type:REMOVE_FROM_CART,
    payload:item,
})
