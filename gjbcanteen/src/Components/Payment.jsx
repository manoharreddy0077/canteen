import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import User from './MenuList/User';

const Payment = () => {
  const cartItems=useSelector(state=>state.cart.items);
  const cartTotal=useSelector(state=>state.cart.total);
  const username=useSelector(state=>state.auth.username);
  const [paymentOption,setPaymentOption]=useState(null);
  const [upiid, setUpiId] = useState(''); // Define upiid state variable
  const [cardNumber, setCardNumber] = useState(''); // Define cardNumber state variable
  const [cardName, setCardName] = useState(''); // Define cardName state variable
  const [cvv, setCvv] = useState(''); // Define cvv state variable

  const upiIdPattern=/^\d{10}@[a-zA-Z]{3}$/;

  const [upiIdError,setUpiIdError]=useState('');

  const navigate=useNavigate();
  
  const handleUPIpayment=()=>{
    setPaymentOption('UPI')
  }
  const handelDebitCardPayment=()=>{
    setPaymentOption('Debit Card');
  }

  const handleUpiIdChange=(event)=>{
    const value=event.target.value;
    setUpiId(value);

    if(!upiIdPattern.test(value)){
      setUpiIdError('Invalid UPI ID format');
    }else{
      setUpiIdError('');
    }
  }
  const handleCardNumberChange=(event)=>{
    const value=event.target.value
    if(value.length <=12){
      setCardNumber(value);
    }  
    else{
      alert('card Number should be of length 12 only')
    }
  }
  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCvvChange = (event) => {
    const value=event.target.value;
    if(value.length <=3){
      setCvv(value);
    }else{
      alert("CVV must be of length 3 only")
    }
  };
  const hanldePay=async()=>{
    if(paymentOption === 'UPI'){
      if(upiIdError===''){
        try{
          await sendCartItemsToServer(cartItems);
          const response= await storeCartDetailsWithUsername(cartItems,username);
          const data=await response.json();
          alert(`Hey ${username} your order number is ----> ${data.orderNumber}`);
          navigate(`/OrderDetailsDisplay/${data.orderNumber}`)
        }catch(error){
          console.error('Error while sending cart items to the server:', error);
          alert('incorrect field entry');
      }
      }else{
        alert('Incorrect field entry');
      }
    }
    if(paymentOption === 'Debit Card'){
      if(cardNumber.length ===12 && cvv.length ===3 && cardName.length>0)
      {
        try{
           await sendCartItemsToServer(cartItems);
           const response= await storeCartDetailsWithUsername(cartItems,username);
          const data=await response.json();
          alert(`Hey ${username} your order number is ----> ${data.orderNumber}`);
          navigate(`/OrderDetailsDisplay/${data.orderNumber}`)
        }catch(error){
          console.error('Error while sending cart items to the server:', error);
          alert('An error occurred while processing the payment. Please try again later.');
        }
      }else{
        alert('incorrect field entry');
      }
    }
  };
  const sendCartItemsToServer=async(cartItems)=>{
    const itemsByCanteen={};
    cartItems.forEach(item=>{
      if(!itemsByCanteen[item.canteen]){
        itemsByCanteen[item.canteen]=[];
      }
      itemsByCanteen[item.canteen].push(item);
    })
    try{
      const response=await fetch('http://localhost:3001/api/reduceQuantity',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(itemsByCanteen),
      });
      if(!response.ok){
        throw new Error('failed to send cartitems to server');
      }
      return response;
    }catch(error){
      console.error('Error while sending cart items to the server:', error);
       throw error;
    }
  };
  const storeCartDetailsWithUsername=async(cartItems,username)=>{
    console.log('storing');
    try{
      const response=await fetch('http://localhost:3001/api/storeAndGenerateOrderNo',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({cartItems,username})
      });
      if(!response.ok){
        throw new Error('failed to store cart details with username');
      }
      return response;
    }catch(error){
      console.error('Error while storing cart details with username:', error);
      throw error;
    }
  }
  return (
    <div>
       <div>
      <User/>
      </div>
      <div>
        <h2>Item              Price             Quantity      canteen</h2>
        {cartItems.map(item=>(
          <li key={item._id}>{item.Item} ,-------   Rs{item.Price}/- ,  -------    {item.quan}  , ----- {item.canteen}</li>
        ))}
      </div>
      <div>
        <p>cart Total : Rs.{cartTotal}</p>
      </div>
      <div>
        <h2>Select payment method</h2>
        <button onClick={handleUPIpayment}>UPI</button>
        <button onClick={handelDebitCardPayment}>DEBIT CARD</button>
        {paymentOption === 'UPI' && (
          <div>
            <h2>Enter UPI ID</h2>
            <input type="text" placeholder='ENter UPI ID' value={upiid} onChange={handleUpiIdChange}/>
            {upiIdError && <span style={{color:'red'}}>{upiIdError}</span>}
          </div>
        )}
        {paymentOption === 'Debit Card' && (
          <div>
            <h2>Enter card Details</h2>
            <span>Enter card Number</span><input type="Number" placeholder="**** **** ****" value={cardNumber} onChange={handleCardNumberChange} /><br />
            <span>Enter Name as in Card</span><input type="text" placeholder="Name as in card" value={cardName} onChange={handleCardNameChange}/><br />
            <span>Enter CVV</span><input type="Number" placeholder="xxx" value={cvv} onChange={handleCvvChange}/>
          </div>
        )}
      </div>
      <div>
        <button onClick={hanldePay}>pay</button>
      </div>
    </div>
  )
}

export default Payment
