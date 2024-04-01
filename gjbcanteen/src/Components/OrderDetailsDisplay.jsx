import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import User from './MenuList/User';



const OrderDetailsDisplay = () => {
// object deconstructing below
  const {orderNumber}=useParams();
  const cartItems=useSelector(state=>state.cart.items);
  const username=useSelector(state=>state.auth.username)
  const cartTotal=useSelector(state=>state.cart.total)

  const intialTimer=localStorage.getItem('timer') || 18;
  const [timer,setTimer]=useState(Number(intialTimer));
  

  useEffect(()=>{
    const countdown=setInterval(()=>{
      setTimer(prevTimer=>{
        if(prevTimer===0){
          clearInterval(countdown);
          alert(`Your Order ${orderNumber} is ready `)
          return 0;
        }
        localStorage.setItem('timer',prevTimer-1);
        return prevTimer-1;
      });
    },1000);
    return ()=>clearInterval(countdown);
  },[orderNumber]);
  const filterCartItemsByCanteen=(canteenName)=>{
    return cartItems.filter(item=>item.canteen===canteenName);
  }
  return (
    <div>
      <div>
        <User/>
      </div>
      <h1>Your Order Details  {username}</h1>
      <p>Order Number :{orderNumber}</p>
      <div>
        {cartItems.map(item=>(
          <li key={item._id}>{item.Item} ,-------   Rs{item.Price}/- ,  -------    {item.quan}  , ----- {item.canteen}</li>
        ))}
        <p>cart total : Rs.{cartTotal}/-</p>
      </div>
      <h3>Time Remaining : {Math.floor(timer/60)} : {timer%60 <10?'0':''}{timer%60}</h3>
      <h2>Thank you</h2>
      <div>
        {Array.from(new Set(cartItems.map(item=>item.canteen))).map(canteen=>(
          <div key={canteen}>
            <h2>{canteen} Orders:</h2>
            <ul style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {filterCartItemsByCanteen(canteen).map(item=>(
                <li key={item._id}>{item.Item} ,------- Rs{item.Price}/- , ------- {item.quan} , ----- {item.canteen}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderDetailsDisplay;
