import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import User from './MenuList/User';
import './ConfirmCart.css'

const ConfirmCartItems = () => {
  const [insufficientItems,setInsufficientItems]=useState([])
  const navigate=useNavigate();
  const cartItems=useSelector(state=>state.cart.items);
  const cartTotal=useSelector(state=>state.cart.total)
  const handleCartChange=()=>{
    navigate('/MenuList')
  }
  const handlePay=async ()=>{
    const itemsByCanteen={};
    cartItems.forEach(item=>{
      if(!itemsByCanteen[item.canteen]){
        itemsByCanteen[item.canteen]=[];
      }
      itemsByCanteen[item.canteen].push(item);
    })
    const response = await fetch('http://localhost:3001/api/processCart',{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(itemsByCanteen)
    });
    if(response.ok){
      navigate('/Payment')
    }else{
      const {insufficientItems}=await response.json();
      setInsufficientItems(insufficientItems)
      // console.log("in client");
      // console.log('InSufficient items : ' ,insufficientItems);
    }
  };

  return (
    <div className="confirm-cart-container">
    <div className="confirm-cart">
      <h1 className="confirm-cart-heading">Cart Overview</h1>
      <div className="confirm-cart-items">
        <div className="confirm-cart-item-heading">
          <p>Items</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Canteen</p>
        </div>
        {cartItems.map(item => (
          <div className="confirm-cart-item" key={item._id}>
            <p>{item.Item}</p>
            <p>Rs {item.Price}</p>
            <p>{item.quan}</p>
            <p>{item.canteen}</p>
          </div>
        ))}
      </div>
      <div className="confirm-cart-total">
        <p>Cart Total: Rs {cartTotal}</p>
      </div>
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