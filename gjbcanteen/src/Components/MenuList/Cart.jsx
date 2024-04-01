import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

const Cart = () => {
    const [cartTotal,setCartTotal]=useState(0);
    const navigate=useNavigate();
    const cartItems=useSelector(state=>state.cart.items);
    useEffect(()=>{
        calculatecartTotal();
       },[cartItems]);
    const handleCheckOut=()=>{
        navigate('/ConfirmCartItems')
      }
      const calculatecartTotal=()=>{
        let total=0;
        cartItems.forEach(item=>{
          total +=item.Price * item.quan;
        });
        setCartTotal(total);
      }

  return (
    <div>
      <ul>
          {cartItems.map(item=>(
              <li key={item._id}>{item.Item} ---- {item.Price}----Quantity:{item.quan}------Canteen:{item.canteen} </li>
          ))}
      </ul>
      <div>
      {cartItems.length > 0 ? (
        <>
          <p>cart Total : Rs. {cartTotal}</p>
          <button onClick={()=>handleCheckOut()}>Checkout</button>
        </>
      ):(
        <p>Add items to cart to checkout</p>
      )}
      </div>
    </div>
  )
}

export default Cart
