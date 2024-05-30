import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Items = () => {
    const cartTotal = useSelector(state => state.cart.total);
    const cartItems = useSelector(state => state.cart.items);
  return (
    <div>
       <div className="card-container">
          {cartItems.map(item => (
            <div className="card" key={item._id}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfY2kZ_onsFqgRgPSXQB8r6mgxOKkZb6IcRercJSVeAPvnVV7anEzbCAqWhgYy3bbinxE" alt="Food Item" />
              <div className="details">
                <p className="itemname">{item.Item}</p>
                <p className="price">Price: Rs {item.Price}</p>
                <p className="quantity">Quantity: {item.quan}</p>
                <p className="canteen">Canteen: {item.canteen}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="confirm-cart-total">
          <p className='carttotal'>Cart Total: Rs {cartTotal}</p>
        </div>
    </div>
  )
}

export default Items
