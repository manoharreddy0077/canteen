import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const OrderDetailsDisplay = () => {
//   const params = useParams();
// const orderNumber = params.orderNumber;

// object deconstructing below

  const {orderNumber}=useParams();
  const cartItems=useSelector(state=>state.cart.items);
  const username=useSelector(state=>state.auth.username)
  const cartTotal=useSelector(state=>state.cart.total)

  const [timer,setTimer]=useState(18);
  

  useEffect(()=>{
    const countdown=setInterval(()=>{
      setTimer(prevTimer=>{
        if(prevTimer===0){
          clearInterval(countdown);
          alert(`Your Order ${orderNumber} is ready `)
          return 0;
        }
        return prevTimer-1;
      });
    },1000);
    return ()=>clearInterval(countdown);
  },[]);
  return (
    <div>
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
    </div>
  )
}

export default OrderDetailsDisplay;
