import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import User from './MenuList/User';
import './OrderDetailsDisplay.css';

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
          alert(`Your Order ${orderNumber} is ready `);
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
      <div className="details-list">
        <div className="details-header">
          <span>Items</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Canteen</span>
        </div>
        {cartItems.map(item => (
          <div key={item._id} className="details-item">
            <span>{item.Item}</span>
            <span>Rs{item.Price}/-</span>
            <span>{item.quan}</span>
            <span>{item.canteen}</span>
          </div>
        ))}
        <p className="details-total">Cart Total: Rs.{cartTotal}/-</p>
      </div>
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
      <div className="canteen-list">
        <div className="canteen-item-heading">
          <span>Item</span>
          <span>Price</span>
          <span>Quantity</span>
        </div>
        {filterCartItemsByCanteen(canteen).map(item => (
          <div key={item._id} className="canteen-item">
            <span>Item: {item.Item}</span>
            <span>Price: Rs{item.Price}/-</span>
            <span>Quantity: {item.quan}</span>
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
