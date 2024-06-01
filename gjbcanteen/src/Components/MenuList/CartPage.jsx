// CartPage.js

import React from 'react';
import User from './User';
import Cart from './Cart';

const CartPage = () => {
  return (
    <div className='cart-page-container'>
        <div className="user">
        <User />
        </div>
      <div className="cart">
      <Cart />
      </div>
      
    </div>
  );
};

export default CartPage;
