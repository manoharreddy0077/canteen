import React from 'react'
import {useSelector} from 'react-redux';

const MenuList = () => {
    const username=useSelector(state=> state.username);
  return (
    <div>
      <h1>Welcome , {username} ra batta</h1>
    </div>
  )
}

export default MenuList
