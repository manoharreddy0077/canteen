

import React from 'react';
import User from './User';
import Cart from './Cart';

const CartPage = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse items-stretch md:h-screen">
     <div className="md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4 h-200 mb-4">
          <User />
        </div>
      </div>
      <div className="md:w-2/3">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
