import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './MenuList/User';
import './ConfirmCart.css';
import './Card.css'; // Assuming this is the new CSS file
import Items from './Items';

const ConfirmCartItems = () => {
  const [insufficientItems, setInsufficientItems] = useState([]);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => state.cart.total);

  const handleCartChange = () => {
    navigate('/MenuList');
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
    <div className="confirm-cart-container">
      <div className="confirm-cart">
        <h1 className="confirm-cart-heading">Cart Overview</h1>
       <Items/>
        <div className="confirm-cart-insufficient">
          {insufficientItems.length > 0 &&
            insufficientItems.map(({ item }) => (
              <p key={item._id}>
                Insufficient quantity of {item.Item}, only {item.Quantity} are available, make changes to cart before proceeding to pay
              </p>
            ))}
        </div>
        <div className="confirm-cart-buttons">
          <button onClick={handleCartChange}>Modify Cart</button>
          <button onClick={handlePay}>Proceed to pay</button>
        </div>
      </div>
      <div className="user-container">
        <User />
      </div>
    </div>
  );
};

export default ConfirmCartItems;
