import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { removeFromCart } from '../../store/actions.mjs';
import './Cart.css';
// import { ReactComponent as CartIcon } from './cart-icon.svg'; // Make sure you have an SVG file for the cart icon

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    calculatecartTotal();
  }, [cartItems]);

  const handleCheckOut = () => {
    navigate('/ConfirmCartItems')
  }

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
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
        <div className="cart-heading">
          {/* <CartIcon className="cart-icon" /> */}
          <h2>Cart Items</h2>
        </div>
        <div className="card-container-cart">
          {cartItems.map(item => (
            <div key={item._id} className="card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfY2kZ_onsFqgRgPSXQB8r6mgxOKkZb6IcRercJSVeAPvnVV7anEzbCAqWhgYy3bbinxE" alt="Food Item" />
              <div className="details">
                <p className="itemname">{item.Item}</p>
                <p className="price">Price: Rs {item.Price}</p>
                <p className="quantity">Quantity: {item.quan}</p>
                <p className="canteen">Canteen: {item.canteen}</p>
                <button className="remove-button" onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          <div className='total-checkout'>
            <p>Cart Total: Rs. {cartTotal}</p>
            <button className="checkout-button" onClick={handleCheckOut}><p>Checkout</p></button>
          </div>
        ) : (
          <p>Add items to cart to checkout</p>
        )}
      </div>
    </div>
  )
}

export default Cart;
