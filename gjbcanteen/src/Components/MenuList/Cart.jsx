import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './Cart.css'

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  useEffect(() => {
    calculatecartTotal();
  }, [cartItems]);
  const handleCheckOut = () => {
    navigate('/ConfirmCartItems')
  }
  const calculatecartTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.Price * item.quan;
    });
    setCartTotal(total);
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2 className="cart-heading">Cart Items</h2>
        <div className="cart-grid">
          <div className="cart-item-heading">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Canteen</div>
          </div>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div>{item.Item}</div>
              <div>{item.Price}</div>
              <div>{item.quan}</div>
              <div>{item.canteen}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          <div className='total-checkout'>
            <p>Cart Total: Rs. {cartTotal}</p>
            <button onClick={handleCheckOut}>Checkout</button>
          </div>
        ) : (
          <p>Add items to cart to checkout</p>
        )}
      </div>
    </div>
  )
}

export default Cart
