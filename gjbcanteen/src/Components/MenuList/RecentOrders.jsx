import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addToCart,clearCart } from '../../store/actions.mjs';
const RecentOrders = ({recentOrdersData}) => {
    const cartItems=useSelector(state=>state.cart.items)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleCheckOut=(order)=>{
        if(cartItems.length!==0){
            dispatch(clearCart());
        }
        order.cartDetails.forEach(item=>{
            const itemWithCanteen = { ...item, canteen: item.canteen };
            dispatch(addToCart(itemWithCanteen));
        }) 
        navigate('/ConfirmCartItems')
      }
    return (
        <div>
            {recentOrdersData.map((order,index)=>(
                <div key={index}>
                    <h4>Order Number : {order.orderNumber}</h4>
                    <ul>
                        {order.cartDetails.map((item,idx)=>(
                            <li key={idx}>
                                <p>Item : {item.Item}</p>
                                <p>Price : {item.Price}</p>
                                <p>Quantity : {item.quan}</p>
                                <p>Canteen : {item.canteen}</p>
                            </li>
                        ))}
                    </ul>
                    <p>Total Price :{calculateTotalPrice(order.cartDetails)}</p>
                    <button onClick={()=>handleCheckOut(order)}>Checkout</button>
                </div>
            ))}
        </div>
    )
}
const calculateTotalPrice=(cartDetails)=>{
    return cartDetails.reduce((total,item)=>total+(item.Price * item.quan),0);
}
export default RecentOrders
