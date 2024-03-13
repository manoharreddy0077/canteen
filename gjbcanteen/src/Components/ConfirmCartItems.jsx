import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ConfirmCartItems = () => {
  const [insufficientItems,setInsufficientItems]=useState([])
  const navigate=useNavigate();
  const cartItems=useSelector(state=>state.cart);
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
    <div>
      <h1>Confirm cart details</h1>
      <div>
        <h2>Item              Price             Quantity                   Canteen</h2>
        {cartItems.map(item=>(
          <li key={item._id}>{item.Item} ,-------   Rs{item.Price}/- ,  -------    {item.quan}  , ----- {item.canteen}</li>
        ))}
      </div>
      <div>
        {insufficientItems.length > 0 && insufficientItems.map(({item})=>(
          <p key={item._id}>Insufficient quantity of {item.Item} ,only   {item.Quantity} are available , make changes to cart before proceeding to pay </p>
        ))}
      </div>
      <div>
        <button onClick={()=>handleCartChange()}>Make changes to cart</button>
        <button onClick={()=>handlePay()}>Proceed to pay</button>
      </div>
    </div>
  )
}

export default ConfirmCartItems
