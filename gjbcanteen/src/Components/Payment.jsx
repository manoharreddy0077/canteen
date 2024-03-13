import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Payment = () => {
  const cartItems=useSelector(state=>state.cart);
  const [paymentOption,setPaymentOption]=useState(null);
  const [upiid, setUpiId] = useState(''); // Define upiid state variable
  const [cardNumber, setCardNumber] = useState(''); // Define cardNumber state variable
  const [cardName, setCardName] = useState(''); // Define cardName state variable
  const [cvv, setCvv] = useState(''); // Define cvv state variable


  const [upiIdError,setUpiIdError]=useState('');
  const handleUPIpayment=()=>{
    setPaymentOption('UPI')
  }
  const handelDebitCardPayment=()=>{
    setPaymentOption('Debit Card');
  }




  const handleUpiIdChange=(event)=>{
    const value=event.target.value;
    setUpiId(value);

    const upiIdPattern=/^\d{10}@[a-zA-Z]{3}$/;

    if(!upiIdPattern.test(value)){
      setUpiIdError('Invalid UPI ID format');
    }else{
      setUpiIdError('');
    }
  }
  const handleCardNumberChange=(event)=>{
    setCardNumber(event.target.value);
  }
  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };
  return (
    <div>
      <h1>payment</h1>
      <div>
        <h2>Item              Price             Quantity      canteen</h2>
        {cartItems.map(item=>(
          <li key={item._id}>{item.Item} ,-------   Rs{item.Price}/- ,  -------    {item.quan}  , ----- {item.canteen}</li>
        ))}
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
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleCardNumberChange}/>
            <input type="text" placeholder="Name as in card" value={cardName} onChange={handleCardNameChange}/>
            <input type="text" placeholder="CVV" value={cvv} onChange={handleCvvChange}/>
          </div>
        )}
      </div>
      <div>
        <button>pay</button>
      </div>
    </div>
  )
}

export default Payment
