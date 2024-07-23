

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './MenuList/User';
import Items from './Items';
import Cart from './MenuList/Cart';

const ConfirmCartItems = () => {
  const [insufficientItems, setInsufficientItems] = useState([]);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => state.cart.total);

  const handleCartChange = () => {
    navigate('/Cart');
  };

  const handlePay = async () => {
    const itemsByCanteen = {};
    cartItems.forEach(item => {
      if (!itemsByCanteen[item.canteen]) {
        itemsByCanteen[item.canteen] = [];
      }
      itemsByCanteen[item.canteen].push(item);
    });
    const response = await fetch('http://localhost:3001/api/processCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemsByCanteen),
    });
    if (response.ok) {
      navigate('/Payment');
    } else {
      const { insufficientItems } = await response.json();
      setInsufficientItems(insufficientItems);
    }
  };

  return (
    <div className=" flex flex-col-reverse md:flex-row items-stretch md:h-screen p-4">
      <div className="md:w-2/3 md:mr-4 mb-4 md:mb-0">
        <div className="rounded-lg   shadow-md p-4 h-full">
          <h1 className="text-4xl font-bold mb-6 text-center  text-white underline px-6">Cart Overview</h1>
       
          <div className="bg-yellow-200 rounded-lg shadow-md p-4 h-full max-w-4xl mt-8 text-black ml-2 px-6  mx-auto  py-6 md:pl-0">
            <Items />
            <div className="mt-4">
            {insufficientItems.length > 0 &&
              insufficientItems.map(({ item }) => (
                <p key={item._id} className="text-red-500">
                  Insufficient quantity of {item.Item}, only {item.Quantity} are available. Please adjust your cart.
                </p>
              ))}
         
        </div>
          <div className="mt-4 flex justify-around">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none" onClick={handleCartChange}>Modify Cart</button>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 focus:outline-none" onClick={handlePay}>Proceed to Pay</button>
          </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4 h-200 mb-4">
          <User />
        </div>
      </div>
    </div>
  );
};

export default ConfirmCartItems;
