const SET_USERNAME='SET_USERNAME';
const SET_PASSWORD='SET_PASSWORD';
const ADD_TO_CART='ADD_TO_CART';
const UPDATE_CART_ITEM='UPDATE_CART_ITEM';

const setUsername=(username)=>({
    type:SET_USERNAME,
    payload:username,
});

const setPassword=(password)=>({
    type:SET_PASSWORD,
    payload:password,
});

const addToCart=(item)=>({
    type:ADD_TO_CART,
    payload:item,
});

const  upadateCartItem=(item)=>({
    type:UPDATE_CART_ITEM,
    payload:item,
});


module.exports = {
    SET_USERNAME,
    SET_PASSWORD,
    setUsername,
    setPassword,
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    addToCart,
    upadateCartItem
};