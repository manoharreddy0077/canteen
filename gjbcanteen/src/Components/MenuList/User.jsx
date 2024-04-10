import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import profile from './profile.jpeg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetUsername, resetPassword ,clearCart} from '../../store/actions.mjs';
import './User.css';

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

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

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
    <div className='userContainer'>
      <div className='idCard'>
        <div className='profileSection'>
          <img src={profile} alt="Profile Picture" className='profilePic' />
          <div className='userInfo'>
            <span className='username'>{username}</span>
          </div>
        </div>
        <div className='navButtons'>
          <button className='p-3 bg-' onClick={handleRollup}>Roll up</button>
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      </div>
    </div>
  );
}

export default User;
