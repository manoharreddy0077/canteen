
import './App.css';
import './Components/Auth/Auth';
import './Components/ConfirmCartItems'
import './Components/MenuList/MenuList';
import './Components/OrderDetailsDisplay'
import './Components/Payment'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import MenuList from './Components/MenuList/MenuList';
import ConfirmCartItems from './Components/ConfirmCartItems';
import Payment from './Components/Payment';
import OrderDetailsDisplay from './Components/OrderDetailsDisplay';
import RollUpData from './Components/RollUpData';
import CartPage from './Components/MenuList/CartPage';
import Dashboard from './Components/Dashboards/Dashboard';
import Layout from './Layout'; // Import the Layout component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/MenuList" element={<MenuList />} />
                  <Route path="/OrderDetailsDisplay/:orderNumber" element={<OrderDetailsDisplay />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </Layout>
            }
          />
          <Route path="/ConfirmCartItems" element={<ConfirmCartItems />} />
          <Route path="/Payment" element={<Payment />} />
           <Route path="/RollUpData" element={<RollUpData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
