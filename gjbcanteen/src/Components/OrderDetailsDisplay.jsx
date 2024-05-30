import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import User from './MenuList/User';
import './OrderDetailsDisplay.css';
import Items from './Items';

// Mock data for canteen addresses (replace with actual data source if available)
const canteenAddresses = {
  "C1Menu": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560085",
  "C2Menu": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560085",
  "C3Menu": "Banshankari 3rd stage hosakerehalli pes college, ring road campus boys hostel 560089",
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
    <div className="order-details-container">
      <div className="details-and-user">
        <div className="details">
          <h1 className="details-heading">Order Details</h1>
          <p className='order-number'>Order Number: {orderNumber}</p>
          <Items />
          <h3 className="details-timer">Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
        </div>
        <div className="user">
          <User />
        </div>
      </div>
      <div className="canteen">
        {Array.from(new Set(cartItems.map(item => item.canteen))).map(canteen => (
          <div key={canteen} className="canteen-block">
            <h2 className="canteen-heading">{canteen} Orders:</h2>
            <p className="canteen-address">{canteenAddresses[canteen] || 'Address not available'}</p>
            <div className="canteen-list">
              {filterCartItemsByCanteen(canteen).map(item => (
                <div key={item._id} className="canteen-card">
                  <div className="canteen-card-item">
                    <span className="itemname">{item.Item}</span>
                    <span className="price">Rs {item.Price}/-</span>
                    <span className="quantity">Quantity: {item.quan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h2 className="details-thank-you">Thank you</h2>
      </div>
    </div>
  );
};

export default OrderDetailsDisplay;
