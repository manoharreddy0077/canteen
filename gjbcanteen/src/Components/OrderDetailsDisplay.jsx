
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import User from './MenuList/User';
import Items from './Items';

// Mock data for canteen addresses (replace with actual data source if available)
const canteenAddresses = {
  "C1": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560085",
  "C2": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560085",
  "C3": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560089",
  // Add more canteen addresses as needed
};

const OrderDetailsDisplay = () => {
  const { orderNumber } = useParams();
  const cartItems = useSelector(state => state.cart.items);
  const username = useSelector(state => state.auth.username);
  const cartTotal = useSelector(state => state.cart.total);

  const initialTimer = localStorage.getItem('timer') || 18;
  const [timer, setTimer] = useState(Number(initialTimer));

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          alert(`Your Order ${orderNumber} is ready`);
          return 0;
        }
        localStorage.setItem('timer', prevTimer - 1);
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [orderNumber]);

  const filterCartItemsByCanteen = canteenName => {
    return cartItems.filter(item => item.canteen === canteenName);
  };

  return (
    <div className="flex flex-col bg-black-gradient mt-0">
       
    <div className="flex flex-col-reverse md:flex-row items-stretch md:h-screen p-4">
      
      {/* Left Section */}
      <div className="md:w-2/3 md:mr-4 mb-4 md:mb-0">
      <h2 className="text-4xl font-bold mb-6 text-center mt-2 text-white underline ">Order Details</h2>
        <div className="bg-yellow-300 rounded-lg shadow-md p-4 h-full">
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-4 underline">Order Details</h1> */}
          <p className="text-lg mb-2">Order Number: {orderNumber}</p>
          <Items />
          <h3 className="text-lg mt-4 mb-2 ">Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
        </div>
      </div>

      {/* Top Right Section */}
      <div className="md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4 h-200 mb-4">
          <User />
        </div>
      </div>
    </div>
      {/* Bottom Section */}
      <div className="md:w-full mt-4 overflow-y-auto">
        {Array.from(new Set(cartItems.map(item => item.canteen))).map(canteen => (
          <div key={canteen} className="bg-blue-500 rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-3xl text-white font-bold mb-2">{canteen} Orders:</h2>
            <p className="text-s text-white mb-2">{canteenAddresses[canteen] || 'Address not available'}</p>
            <div className="grid gap-4  ">
              {filterCartItemsByCanteen(canteen).map(item => (
                <div key={item._id} className="border bg-red-500 border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold text-white">{item.Item}</span>
                    <span className="text-xl text-white">Rs {item.Price}/-</span>
                  </div>
                  <div className=" text-xl text-white mt-2">Quantity: {item.quan}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h2 className="text-2xl font-bold mt-4">Thank you for your order!</h2>
      </div>
    </div>
  );
};

export default OrderDetailsDisplay;
