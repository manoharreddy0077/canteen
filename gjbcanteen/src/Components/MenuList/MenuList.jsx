import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions.mjs';
import { useNavigate } from 'react-router-dom';
import RecentOrders from './RecentOrders';
import Cart from './Cart';
import User from './User';
import './MenuList.css';
import '../Card.css'; // Ensure the same CSS for cards is used

const MenuList = () => {
  const navigate = useNavigate();
  const [canteen, setCanteen] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [recentOrdersData, setRecentOrdersData] = useState([]);
  const username = useSelector(state => state.auth.username);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMenuData();
  }, [canteen]);

  const fetchMenuData = async () => {
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
      alert('item not in cart');
    }
  };

  const renderMenuItems = () => {
    return (
      <div className="card-container">
        {menuData.map((item) => (
          <div className={`card ${cartItems.some(cartItem => cartItem._id === item._id) ? 'item-in-cart' : ''}`} key={item._id}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfY2kZ_onsFqgRgPSXQB8r6mgxOKkZb6IcRercJSVeAPvnVV7anEzbCAqWhgYy3bbinxE" alt="Food Item" />
            <div className="details">
              <p className="itemname">{item.Item}</p>
              <p className="price">Price: Rs {item.Price}</p>
              <p className="canteen">Canteen: {canteen}</p>
              <div className="item-buttons">
                <button className='addtocart' onClick={() => handleAddToCart(item)}>Add</button>
                {/* <button className='removefromcart' onClick={() => handleRemoveFromCart(item)}>Remove</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    recentOrders();
  }, []); // Fetch recent orders when component mounts

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

  const handleViewCart = () => {
    navigate('/cart'); // Redirect to the cart page
  };

  return (
    <div className='menu_container'>
      <div className='MenuList'>
        <div className="fullMenu">
          <div className="canteenName_and_image">
            <div className='CanteenButtons'>
              <button onClick={() => setCanteen('C1Menu')}> <span> Food Court </span></button>
              <button onClick={() => setCanteen('C2Menu')}> <span>Halli Mane</span> </button>
              <button onClick={() => setCanteen('C3Menu')}> <span>Chineese </span></button>
            </div>
            <div className='canteen-names'>
              <h2>{canteen}</h2>
            </div>
          </div>
          <div className='MenuItems'>
            {menuData.length > 0 ? renderMenuItems() : <p>No Menu</p>}
          </div>
        </div>
        <div className="user_and_cart">
          <div className='Header'>
            <User />
          </div>
          <div>
            <Cart />
          </div>
        </div>
        <button className="view-cart-button" onClick={handleViewCart}>View Cart</button>
      </div>
      <div className='recentOrders'>
        <RecentOrders recentOrdersData={recentOrdersData}></RecentOrders>
      </div>
    </div>
  );
};

export default MenuList;
