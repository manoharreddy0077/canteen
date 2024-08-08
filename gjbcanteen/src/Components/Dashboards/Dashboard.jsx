// src/Components/Dashboards/Dashboard.jsx
import React from 'react';
import User from '../MenuList/User';
import Menu from './Menu';
import './Dashboard.css';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
  const username = useSelector(state => state.auth.username);
  // const dispatch = useDispatch();
  return (
    <div className="dashboard">
      <div className="content">
        <Menu username={username} />
      </div>
      <div className="header">
        <User />
      </div>
    </div>
  );
};

export default Dashboard;
