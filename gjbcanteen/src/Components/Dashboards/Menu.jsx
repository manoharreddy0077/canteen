import React, { useState, useEffect } from 'react';
import './Menu.css'

const Menu = ({ username }) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetchMenuData();
  }, [username]);

  const fetchMenuData = async () => {
    try {
      const canteen = username.split('_')[0];
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

  const renderMenuItems = () => {
    return (
      <div className="card-container">
        {menuData.map((item) => (
          <div className="card" key={item._id}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfY2kZ_onsFqgRgPSXQB8r6mgxOKkZb6IcRercJSVeAPvnVV7anEzbCAqWhgYy3bbinxE" alt="Food Item" />
            <div className="details">
              <p className="itemname">{item.Item}</p>
              <p className="price">Price: Rs {item.Price}</p>
              <p className='quantity'>Quantity : {item.Quantity}</p>
              {/* <p className="canteen">Canteen: {canteen}</p> */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>{username.split('_')[0]} Menu</h2>
      <div>
        <h3>Menu Items</h3>
        <div className='MenuItems'>
            {menuData.length > 0 ? renderMenuItems() : <p>No Menu</p>}
          </div>
      </div>
    </div>
  );
};

export default Menu;


