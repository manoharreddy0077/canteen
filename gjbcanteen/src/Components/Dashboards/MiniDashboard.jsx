import React, { useState, useEffect } from 'react';
// import './MiniDashboard.css';

const MiniDashboard = ({ canteen }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  useEffect(() => {
    fetchOrdersData(selectedDate);
  }, [selectedDate]);

  const fetchOrdersData = async (date) => {
    try {
      const response = await fetch(`http://localhost:3001/api/Orders?canteen=${canteen}&date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders data');
      }
      const data = await response.json();
      setOrdersData(data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const calculateTotalOrders = () => {
    return ordersData.length;
  };

  // Add more calculations or data processing functions here

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-filters">
        <label>
          Select Date:
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </label>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{calculateTotalOrders()}</p>
        </div>
        {/* Add more stat cards here */}
      </div>
    </div>
  );
};

export default MiniDashboard;
