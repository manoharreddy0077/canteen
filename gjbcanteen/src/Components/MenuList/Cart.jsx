


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../../store/actions.mjs';


const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const handleCheckOut = () => {
    navigate('/ConfirmCartItems');
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateCartTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.Price * item.quan;
    });
    setCartTotal(total);
  };

  return (
    <div>
    <h2 className="text-4xl font-bold mb-6 text-center mt-2 text-white underline ">Cart Items</h2>
    <div className=" bg-yellow-100 max-w-4xl rounded mt-8 text-white max-w-screen-md  mx-auto px-4 py-8 md:pl-0">
      {/* <h2 className="text-4xl font-bold mb-6 text-center text-black ">Cart Items</h2> */}
      <div className="grid ml-4   grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-96">
        {cartItems.map(item => (
          <div key={item._id} className="border bg-white border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img src="https://via.placeholder.com/150" alt="Food Item" className="w-full h-32 sm:h-40 object-cover" />
            <div className="p-4">
              <p className="text-lg text-black font-semibold mb-2">{item.Item}</p>
              <p className="text-sm mb-1 text-black">Price: Rs {item.Price}</p>
              <p className="text-sm mb-1 text-black">Quantity: {item.quan}</p>
              <p className="text-sm mb-1 text-black">Canteen: {item.canteen}</p>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm mt-2 hover:bg-red-600 focus:outline-none" onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {cartItems.length > 0 ? (
          <div className="flex flex-col  justify-between items-center">
            <p className="text-lg font-bold text-center m-1 text-black">Cart Total: Rs. {cartTotal}/-</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none" onClick={handleCheckOut}>Checkout</button>
          </div>
        ) : (
          <p className="text-lg text-center mt-4">Add items to cart to checkout</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Cart;
