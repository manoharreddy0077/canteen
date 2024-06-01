import logo from './logo.svg';
import './App.css';
import './Components/Auth/Auth';
import './Components/ConfirmCartItems'
import './Components/MenuList/MenuList';
import './Components/OrderDetailsDisplay'
import './Components/Payment'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import MenuList from './Components/MenuList/MenuList';
import ConfirmCartItems from './Components/ConfirmCartItems';
import Payment from './Components/Payment';
import OrderDetailsDisplay from './Components/OrderDetailsDisplay';
import { combineReducers } from 'redux';
import RollUpData from './Components/RollUpData';

import Items from './Components/Items';
import CartPage from './Components/MenuList/CartPage';
// import  store from './store/store'
function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path='/'Component={Auth}></Route>
              <Route path='/MenuList'Component={MenuList}></Route>
              <Route path='/ConfirmCartItems'Component={ConfirmCartItems}></Route>
              <Route path='/Payment'Component={Payment}></Route>
              <Route path='/OrderDetailsDisplay/:orderNumber'Component={OrderDetailsDisplay}></Route>
              <Route path='/RollUpData' Component={RollUpData}></Route>
              <Route path='/cart' Component={CartPage}></Route>
            </Routes>
      </Router>
    </div>
  );
}

export default App;
