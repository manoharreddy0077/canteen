import React, { useState } from 'react'
import './Register'
import Register from './Register'
import Login from './Login'
import store from '../../store/store'
import { Provider } from 'react-redux'
import './Auth.css'


const Auth = () => {

  const [showRegister,setShowRegister]=useState(false);

  const handleSwitchToLogin=()=>{
    setShowRegister(false);
  }
  const handleSwitchToRegister=()=>{
    setShowRegister(true);
  }
  return (
    <Provider store={store}>
      <div className='LoginPage'>
       <span className='left'>
        {showRegister ? ( <Register/>) :(<Login/>)}
        {showRegister ? (
          <p>
            Already a User?{''}
            <a href="#" onClick={handleSwitchToLogin}>Login</a>
          </p>
        ):(
          <p>
             Not an User?{' '}
              <a href="#" onClick={handleSwitchToRegister}>
                Register first
              </a>
          </p>
        )}
        </span>
      </div>
    </Provider>
  )
}

export default Auth
