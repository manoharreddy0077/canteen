

import React from 'react';
import { useSelector } from 'react-redux';

const Items = () => {
  const cartTotal = useSelector(state => state.cart.total);
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-96">
        {cartItems.map(item => (
          <div key={item._id} className="border ml-4 bg-white border-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img src="https://via.placeholder.com/150" alt="Food Item" className="w-full h-40 object-cover" />
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{item.Item}</p>
              <p className="text-sm mb-1">Price: Rs {item.Price}</p>
              <p className="text-sm mb-1">Quantity: {item.quan}</p>
              <p className="text-sm mb-1">Canteen: {item.canteen}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="text-lg font-bold">Cart Total: Rs. {cartTotal}/-</div>
      </div>
    </div>
  );
};

export default Items;
