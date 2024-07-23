
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import profile from './profile.jpeg';
import { useNavigate } from 'react-router-dom';
import { resetUsername, resetPassword, clearCart } from '../../store/actions.mjs';

const User = () => {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(resetUsername());
    dispatch(resetPassword());
    dispatch(clearCart());
    navigate('/');
  };

  const handleRollup = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/RollUp`, {
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
      const jsonData = JSON.stringify(allOrdersData);

      if (jsonData !== '') {
        navigate(`/RollUpData?Orders=${encodeURIComponent(jsonData)}`);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  return (
    <div className="flex flex-col md:h-200 justify-between bg-white shadow-md p-4">
      <div className="mb-4">
        <div className="flex items-center mb-2 md:mb-4">
          <img src={profile} alt="Profile Picture" className="w-12 h-12 rounded-full mr-2" />
          <span className="text-lg font-bold">{username}</span>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none flex-1" onClick={handleRollup}>Roll up</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 focus:outline-none flex-1 mt-2 md:mt-0" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default User;
