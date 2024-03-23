import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecentOrders = ({recentOrdersData}) => {
    const navigate=useNavigate();
    const handleCheckOut=()=>{
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
                    <button onClick={()=>handleCheckOut()}>Checkout</button>
                </div>
            ))}
        </div>
    )
}
const calculateTotalPrice=(cartDetails)=>{
    return cartDetails.reduce((total,item)=>total+(item.Price * item.quan),0);
}
export default RecentOrders
