

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions.mjs';
import { useNavigate } from 'react-router-dom';
import RecentOrders from './RecentOrders';
import Cart from './Cart';
import User from './User';
import c1 from './c1.jpeg';
import c2 from './c2.jpeg';
import c3 from './c3.jpeg';


const MenuList = () => {
  const navigate = useNavigate();
  const [canteen, setCanteen] = useState('C1');
  const [menuData, setMenuData] = useState([]);
  const [recentOrdersData, setRecentOrdersData] = useState([]);
  const username = useSelector(state => state.auth.username);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const canteenImages = {
    C1: c1,
    C2: c2,
    C3: c3,
  };
  

  useEffect(() => {
    fetchMenuData();
  }, [canteen]);

  const fetchMenuData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    try {
      const response = await fetch(`http://localhost:3001/api/MenuList?canteen=${canteen}`, {
        method: 'POST',
        body: JSON.stringify({ canteen: canteen })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }

      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
      if (error.message === 'No token found') {
        navigate('/login');
      }
    }
  };

  const handleAddToCart = (item) => {
    const itemWithCanteen = { ...item, canteen: canteen };
    dispatch(addToCart(itemWithCanteen));
  };

  const handleRemoveFromCart = (item) => {
    const isItemInCart = cartItems.some(cartItem => cartItem.Item === item.Item && cartItem.canteen === canteen);

    if (isItemInCart) {
      const itemWithCanteen = { ...item, canteen: canteen };
      dispatch(removeFromCart(itemWithCanteen));
    } else {
      alert('Item not in cart');
    }
  };

  const renderMenuItems = () => {
    return (
      <div className="grid grid-cols-2   sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuData.map((item, index) => (
          <div key={index} className={`menu-item bg-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg ${cartItems.some(cartItem => cartItem._id === item._id) ? 'ring-2 ring-green-500' : ''}`}>
            <img className="w-full h-32 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfY2kZ_onsFqgRgPSXQB8r6mgxOKkZb6IcRercJSVeAPvnVV7anEzbCAqWhgYy3bbinxE" alt="Food Item" />
            <div className="p-4">
              <p className="text-lg font-bold">{item.Item}</p>
              <p className="text-gray-700">Price: Rs {item.Price}</p>
              <p className="text-gray-700">Canteen: {canteen}</p>
              <button className="bg-green-500 text-white py-1 px-4 rounded mt-2 hover:bg-green-600 transition duration-300" onClick={() => handleAddToCart(item)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    recentOrders();
  }, []);

  const recentOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/recentOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recent orders data');
      }

      const allOrdersData = await response.json();
      setRecentOrdersData(allOrdersData);
    } catch (error) {
      console.error('Error fetching recent orders data:', error);
    }
  };
  const renderImage = () => {
    if (canteenImages[canteen]) {
      return <div className='max-w-md'><img src={canteenImages[canteen]} alt={`Canteen ${canteen}`} className="w-full h-auto object-cover rounded-lg shadow-md" /></div>;
    }
    return null; // This case should not occur as default is 'C1'
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="menu-list-container container mx-auto p-4 bg-black min-h-screen">
      {/* <div className="m-0">
      <Header/>
      </div>
       */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex space-x-2">
          <button className="menu-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300" onClick={() => setCanteen('C1')}>Food Court</button>
          <button className="menu-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300" onClick={() => setCanteen('C2')}>Halli Mane</button>
          <button className="menu-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300" onClick={() => setCanteen('C3')}>Chinese</button>
        </div>
        <div className="max-w-96">
        {renderImage()}
      </div>
        <div className="md:w-1/3  flex-shrink-0">
          <div className="bg-white  rounded-lg shadow-md p-4 h-200">
            <User />
          </div>
          <button className="menu-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300" onClick={handleViewCart}>View Cart</button>
          </div>
        </div>

      <div className="text-center text-2xl font-bold mb-4">{canteen}</div>

      <div className="menu-items mb-8">
        {menuData.length > 0 ? renderMenuItems() : <p>No Menu</p>}
      </div>

      <div className="mt-8">
        <RecentOrders recentOrdersData={recentOrdersData}></RecentOrders>
      </div>
    </div>
  );
};

export default MenuList;
