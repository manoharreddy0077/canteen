
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './MenuList/User';
import Items from './Items';

const Payment = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => state.cart.total);
  const username = useSelector(state => state.auth.username);
  const [paymentOption, setPaymentOption] = useState(null);
  const [upiid, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiIdError, setUpiIdError] = useState('');
  const navigate = useNavigate();

  const upiIdPattern = /^\d{10}@[a-zA-Z]{3}$/;

  const handleUPIpayment = () => {
    setPaymentOption('UPI');
  };

  const handelDebitCardPayment = () => {
    setPaymentOption('Debit Card');
  };

  const handleUpiIdChange = event => {
    const value = event.target.value;
    setUpiId(value);

    if (!upiIdPattern.test(value)) {
      setUpiIdError('Invalid UPI ID format');
    } else {
      setUpiIdError('');
    }
  };

  const handleCardNumberChange = event => {
    const value = event.target.value;
    if (value.length <= 12) {
      setCardNumber(value);
    } else {
      alert('Card Number should be of length 12 only');
    }
  };

  const handleCardNameChange = event => {
    setCardName(event.target.value);
  };

  const handleCvvChange = event => {
    const value = event.target.value;
    if (value.length <= 3) {
      setCvv(value);
    } else {
      alert('CVV must be of length 3 only');
    }
  };

  const hanldePay = async () => {
    if (paymentOption === 'UPI') {
      if (upiIdError === '') {
        try {
          await sendCartItemsToServer(cartItems);
          const response = await storeCartDetailsWithUsername(cartItems, username);
          const data = await response.json();
          alert(`Hey ${username} your order number is ----> ${data.orderNumber}`);
          navigate(`/OrderDetailsDisplay/${data.orderNumber}`);
        } catch (error) {
          console.error('Error while sending cart items to the server:', error);
          alert('An error occurred while processing the payment. Please try again later.');
        }
      } else {
        alert('Incorrect field entry');
      }
    }
    if (paymentOption === 'Debit Card') {
      if (cardNumber.length === 12 && cvv.length === 3 && cardName.length > 0) {
        try {
          await sendCartItemsToServer(cartItems);
          const response = await storeCartDetailsWithUsername(cartItems, username);
          const data = await response.json();
          alert(`Hey ${username} your order number is ----> ${data.orderNumber}`);
          navigate(`/OrderDetailsDisplay/${data.orderNumber}`);
        } catch (error) {
          console.error('Error while sending cart items to the server:', error);
          alert('An error occurred while processing the payment. Please try again later.');
        }
      } else {
        alert('Incorrect field entry');
      }
    }
  };

  const sendCartItemsToServer = async cartItems => {
    const itemsByCanteen = {};
    cartItems.forEach(item => {
      if (!itemsByCanteen[item.canteen]) {
        itemsByCanteen[item.canteen] = [];
      }
      itemsByCanteen[item.canteen].push(item);
    });

    try {
      const response = await fetch('http://localhost:3001/api/reduceQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemsByCanteen),
      });

      if (!response.ok) {
        throw new Error('Failed to send cart items to server');
      }

      return response;
    } catch (error) {
      console.error('Error while sending cart items to the server:', error);
      throw error;
    }
  };

  const storeCartDetailsWithUsername = async (cartItems, username) => {
    console.log('Storing cart details with username');
    try {
      const response = await fetch('http://localhost:3001/api/storeAndGenerateOrderNo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, username }),
      });

      if (!response.ok) {
        throw new Error('Failed to store cart details with username');
      }

      return response;
    } catch (error) {
      console.error('Error while storing cart details with username:', error);
      throw error;
    }
  };

  return (
  <div >
    
    <div className="flex bg-black h-full flex-col-reverse md:flex-row items-stretch md:h-screen p-4">
      <div className="md:w-2/3 md:mr-4 mb-4 md:mb-0">
      <h2 className="text-4xl font-bold mb-6 text-center mt-2 text-white underline ">Payment</h2>
        <div className="bg-yellow-200 rounded-lg shadow-md p-4 h-full">
          <Items />
          <div className="payment-method mb-4">
            <h2 className="text-lg mb-2">Select payment method</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              onClick={handleUPIpayment}
            >
              UPI
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              onClick={handelDebitCardPayment}
            >
              DEBIT CARD
            </button>
            {paymentOption === 'UPI' && (
              <div className="payment-option-details mt-4">
                <h2 className="text-lg mb-2">Enter UPI ID</h2>
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiid}
                  onChange={handleUpiIdChange}
                  className="form-input w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
                {upiIdError && <span className="text-red-500">{upiIdError}</span>}
              </div>
            )}
            {paymentOption === 'Debit Card' && (
              <div className="payment-option-details mt-4">
                <h2 className="text-lg mb-2">Enter card Details</h2>
                <div className="form-element">
                  <label className="block mb-1">Card Number</label>
                  <input
                    type="number"
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="**** **** ****"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>
                <div className="form-element">
                  <label className="block mb-1">Name on Card</label>
                  <input
                    type="text"
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Name as in card"
                    value={cardName}
                    onChange={handleCardNameChange}
                  />
                </div>
                <div className="form-element">
                  <label className="block mb-1">CVV</label>
                  <input
                    type="number"
                    className="form-input w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="xxx"
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="payment-buttons text-center mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={hanldePay}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-md p-4 h-200 mb-4">
          <User />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;
