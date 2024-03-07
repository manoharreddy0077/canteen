// import e from 'cors';
// import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
// import { tr } from 'translate-google/languages';

const MenuList = () => {
    const [canteen,setCanteen]=useState('');
    const [menuData,setMenuData]=useState([]);
    // const [cartItems,setcartItems]=useState([]);
    
    const username=useSelector(state=> state.username);
    const cartItems=useSelector(state=>state.cart);
    const dispatch=useDispatch();

    
   useEffect(()=>{
    fetchMenuData();
   },[canteen])
    const fetchMenuData=async()=>{
      // setCanteen('C1Menu')
      try{
        const response=await fetch(`http://localhost:3001/api/MenuList?canteen=${canteen}`,{
          method:'POST',
         body:JSON.stringify({canteen:canteen})
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data=await response.json();
        console.log(data);
        setMenuData(data);
      }catch(error){
        console.error('Error fetching menu data:', error);
      }
    };
    const handleAddToCart = (item) => {
      console.log(item);
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item === item.Item);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quan++;
        setcartItems(updatedCartItems);
      } else {
        setcartItems([...cartItems, {Item:item.Item,Price:item.price, quan: 1 }]);
      }
    };
    const handleRemoveFromCart = (item) => {
      console.log(item);
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.item === item.item);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[existingItemIndex].quan > 1) {
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quan - 1,
          };
        } else {
          updatedCartItems.splice(existingItemIndex, 1); // Remove the item if quantity is 1
        }
        setcartItems(updatedCartItems);
      } else {
        alert('Item not in cart');
      }
    };

    const renderMenuItems=()=>{
      return (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>price</th>
              <th>Select Your Food</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map(item=>(
              <tr key={item._id}>
                  <td>{item.Item}</td>
                  <td>Rs. {item.Price}</td>
                  <td>
                    <button onClick={()=>handleAddToCart(item)}>+</button>
                    <button onClick={()=>handleRemoveFromCart(item)}>-</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    };
    const renderCartItems=()=>{
      return (
      <ul>
          {cartItems.map(item=>(
              <li key={item._id}>{item.Item} ---- {item.Price}----Quantity:{item.quan} </li>
          ))}
      </ul>
      )
    }
  return (
    <div>
      <h1>Welcome , {username} ra batta</h1>
      <div>
      <button onClick={()=>setCanteen('C1Menu')}>Canteen 1</button>
      <button onClick={()=>setCanteen('C2Menu')}>Canteen 2</button>
      <button onClick={()=>setCanteen('C3Menu')}>Canteen 3</button>
     </div>
     <div>
      <h2>Menu Items</h2>
      {menuData.length > 0 ?  renderMenuItems() :<p>No Menu </p>}
     </div>
     <div>
      {cartItems.length > 0 ? renderCartItems() : <p>Empty Cart</p> }
     </div>
    </div>
  )
}

export default MenuList
