import React from 'react'
import './Register'
import Register from './Register'
import Login from './Login'
import store from '../../store/store'
import { Provider } from 'react-redux'


const Auth = () => {
  return (
    <Provider store={store}>
       <Register/>
       <Login/>
    </Provider>
  )
}

export default Auth
