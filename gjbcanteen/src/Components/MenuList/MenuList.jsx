import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions.mjs';
import { useNavigate } from 'react-router-dom';
import { resetUsername, resetPassword } from '../../store/actions.mjs';
import RecentOrders from './RecentOrders';
import Cart from './Cart';
import User from './User';
import './MenuList.css';
import c1logo from './c1.jpeg'
import c2logo from './c2.jpeg'
import c3logo from './c3.jpeg'

const MenuList = () => {
  const navigate = useNavigate();
  const [canteen, setCanteen] = useState('');
  const [menuData, setMenuData] = useState([]);
  const [recentOrdersData, setRecentOrdersData] = useState([]);
  // const [cartTotal,setCartTotal]=useState(0);
  const username = useSelector(state => state.auth.username);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMenuData();
  }, [canteen])


  const fetchMenuData = async () => {
    // setCanteen('C1Menu')
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
  }

  const renderMenuItems = () => {
    return (
      <div className="menu-items-container">
        <h2 className="menu-heading">Menu Items</h2>
        <div className="menu-items">
          <div className="menu-item-heading">
            <div>Item</div>
            <div>Price</div>
            <div>Select Your Food</div>
          </div>
          {menuData.map((item, index) => (
            <div className={`menu-item ${cartItems.some(cartItem => cartItem._id === item._id) ? 'item-in-cart' : ''}`} key={item._id}>
              <div>{item.Item}</div>
              <div>Rs. {item.Price}</div>
              <div className="item-buttons">
                <button onClick={() => handleAddToCart(item)}>+</button>
                <button onClick={() => handleRemoveFromCart(item)}>-</button>
              </div>
            </div>
          ))}
        </div>
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
        throw new Error('Failed to fetch menu data');
      }
      const allOrdersData = await response.json();
      setRecentOrdersData(allOrdersData);
      // const jsonData=JSON.stringify(allOrdersData);
      // setRecentOrdersData(jsonData);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  }
  return (
  <div className='menu_container'>
    <div className='MenuList'>
      <div className="fullMenu">
        <div className="canteenName_and_image">
          <div className='CanteenButtons'>
            <button onClick={() => setCanteen('C1Menu')}> <span> Food Court </span></button>
            <button onClick={() => setCanteen('C2Menu')}>  <span>Halli Mane</span> </button>
            <button onClick={() => setCanteen('C3Menu')}>  <span>Chineese </span></button>
          </div>
          <div className='canteen-names'>
              <h2>{canteen}</h2>
          </div>
          {/* <div className="canteen_images">
            {canteen === 'C1Menu' ? <img src={c1logo}></img> : <p> </p>}
            {canteen === 'C2Menu' ? <img src={c2logo}></img> : <p> </p>}
            {canteen === 'C3Menu' ? <img src={c3logo}></img> : <p> </p>}
          </div> */}
        </div>
        <div className='MenuItems'>
            {menuData.length > 0 ? renderMenuItems() : <p>No Menu </p>}
        </div>
      </div>
      <div className="user_and_cart">
          <div className='Header'>
            <User />
          </div>
          <div>
            <Cart/>
          </div>
      </div>
    <div/>
    </div>
    <div>
      <div className='recentOrders'>
        <RecentOrders recentOrdersData={recentOrdersData}></RecentOrders>
      </div>
    </div>
    </div>
  )
}

export default MenuList
