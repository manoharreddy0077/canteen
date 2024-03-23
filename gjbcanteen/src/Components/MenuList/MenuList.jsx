// import e from 'cors';
// import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions.mjs';
import { useNavigate } from 'react-router-dom';
import profile from './profile.jpeg'
import { resetUsername,resetPassword } from '../../store/actions.mjs';

const MenuList = () => {
    const navigate = useNavigate();
    const [canteen,setCanteen]=useState('');
    const [menuData,setMenuData]=useState([]);
    const [rollupdata,setRollUpData]=useState({});
    const [redisData,setRedisData]=useState({});
    // const [cartItems,setcartItems]=useState([]);
    const [cartTotal,setCartTotal]=useState(0);
    const username=useSelector(state=> state.auth.username);
    const cartItems=useSelector(state=>state.cart.items);
    const dispatch=useDispatch();
   useEffect(()=>{
    fetchMenuData();
   },[canteen])

   useEffect(()=>{
    calculatecartTotal();
   },[cartItems]);
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
      // const { Quantity, ...itemWithoutQuantity } = itemWithCanteen;
      // dispatch(addToCart(itemWithoutQuantity));
      dispatch(addToCart(itemWithCanteen));
    };
    const handleRemoveFromCart=(item)=>{
      const isItemInCart=cartItems.some(cartItem => cartItem.Item === item.Item && cartItem.canteen === canteen);
      if(isItemInCart){
        const itemWithCanteen = { ...item, canteen: canteen };
        // const { Quantity, ...itemWithoutQuantity } = itemWithCanteen;
        // dispatch(removeFromCart(itemWithoutQuantity));
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
    const renderCartItems=()=>{
      return (
      <ul>
          {cartItems.map(item=>(
              <li key={item._id}>{item.Item} ---- {item.Price}----Quantity:{item.quan}------Canteen:{item.canteen} </li>
          ))}
      </ul>
      )
    }
    const handleCheckOut=()=>{
      navigate('/ConfirmCartItems')
    }
    const calculatecartTotal=()=>{
      let total=0;
      cartItems.forEach(item=>{
        total +=item.Price * item.quan;
      });
      setCartTotal(total);
    }
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
      // console.log(JSON.stringify({username:username}))
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
        const data=await response.json();
        setRollUpData(data);
        console.log(data);
        console.log(typeof data);
        console.log(rollupdata);

        const jsonData=JSON.stringify(data);
        if(jsonData!==''){
          // navigate('/RollUpData');
          navigate(`/RollUpData?Orders=${encodeURIComponent(jsonData)}`);
        }
      }catch(error){
        console.error('Error fetching menu data:', error);
      }
    }
    useEffect(() => {
      console.log(rollupdata);
    }, [rollupdata]);

    const fetchRedisData=async()=>{
      try{
        const response=await fetch('http://localhost:3001/api/redisData');
        if(!response.ok){
          throw new Error('Failed to fetch Redis Data');
        }
        const data=await response.json();
        setRedisData(data);
      }catch(error){
          console.error('Error fetching Redis data: ',error);
        }
      }
    
  return (
    <div>
      {/* <h1>Welcome , {username} ra batta</h1> */}
      <div>
        <img src={profile} alt="image" style={{ width: '100px', height: 'auto',borderRadius:'50%' }}/>
        <span>{username}</span>
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
      {cartItems.length > 0 ? renderCartItems() : <p>Empty Cart</p> }
     </div>
     <div>
      {cartItems.length > 0 ? (
        <>
          <p>cart Total : Rs. {cartTotal}</p>
          <button onClick={()=>handleCheckOut()}>Checkout</button>
        </>
      ):(
        <p>Add items to cart to checkout</p>
      )}
      <div className='redisData'>
        <button onClick={fetchRedisData}>Redis Data</button>
          <h2>Recent Orders</h2>
          {/* <ul>
            {redisData.map((item,index)=>(
              <li key={index}>{item}</li>
            ))}
          </ul> */}
      </div>
     </div>
    </div>
  )
}

export default MenuList
