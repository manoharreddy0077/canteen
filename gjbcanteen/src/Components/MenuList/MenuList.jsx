import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions.mjs';
import { useNavigate } from 'react-router-dom';
import { resetUsername,resetPassword } from '../../store/actions.mjs';
import RecentOrders from './RecentOrders';
import Cart from './Cart';
import User from './User'

const MenuList = () => {
    const navigate = useNavigate();
    const [canteen,setCanteen]=useState('');
    const [menuData,setMenuData]=useState([]);
    const [recentOrdersData, setRecentOrdersData] = useState([]);
    // const [cartTotal,setCartTotal]=useState(0);
    const username=useSelector(state=> state.auth.username);
    const cartItems=useSelector(state=>state.cart.items);
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
        setMenuData(data);
      }catch(error){
        console.error('Error fetching menu data:', error);
      }
    };
    const handleAddToCart = (item) => {
      const itemWithCanteen = { ...item, canteen: canteen };
      dispatch(addToCart(itemWithCanteen));
    };
    const handleRemoveFromCart=(item)=>{
      const isItemInCart=cartItems.some(cartItem => cartItem.Item === item.Item && cartItem.canteen === canteen);
      if(isItemInCart){
        const itemWithCanteen = { ...item, canteen: canteen };
        dispatch(removeFromCart(itemWithCanteen));
      }else{
          alert('item not in cart');
      }
    }

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
    const handleLogOut=()=>{
      dispatch(resetUsername());
      dispatch(resetPassword());
      navigate('/')
    }
    useEffect(()=>{
      if(!username){
        navigate('/');
      }
    },[username,navigate]);
    const handleRollup=async()=>{
      try{
        const response=await fetch(`http://localhost:3001/api/RollUp`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
         body:JSON.stringify({username:username})
        
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const allOrdersData=await response.json();
        const jsonData=JSON.stringify(allOrdersData);
        if(jsonData!==''){
          navigate(`/RollUpData?Orders=${encodeURIComponent(jsonData)}`);
        }
      }catch(error){
        console.error('Error fetching menu data:', error);
      }
    }
    useEffect(() => {
      recentOrders();
  }, []); // Fetch recent orders when component mounts

    const recentOrders=async()=>{
      try{
        const response=await fetch(`http://localhost:3001/api/recentOrders`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
         body:JSON.stringify({username:username})
        
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const allOrdersData=await response.json();
        setRecentOrdersData(allOrdersData);
        // const jsonData=JSON.stringify(allOrdersData);
        // setRecentOrdersData(jsonData);
      }catch(error){
        console.error('Error fetching menu data:', error);
      }
    }
  return (
    <div>
      <div>
        <User/>
      </div>
      <div>
        <button onClick={handleRollup}>Roll up</button>
        <button onClick={handleLogOut}>:LogOut</button>
      </div>
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
      {/* {cartItems.length > 0 ? renderCartItems() : <p>Empty Cart</p> } */}
      <Cart/>
     </div>
      <div className='recentOrders'>
          <RecentOrders recentOrdersData={recentOrdersData}></RecentOrders>
      </div>      
     
    </div>
  )
}

export default MenuList
