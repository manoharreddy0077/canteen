import React from 'react'
import { useLocation } from 'react-router-dom';

const RollUpData = () => {
    const location =useLocation();
    const queryParams=new URLSearchParams(location.search);
    const ordersParam=queryParams.get('Orders');
    let orders={};
    if(ordersParam){
        try{
            orders=JSON.parse(decodeURIComponent(ordersParam));
            console.log(typeof orders);
        }catch(error){
            console.error('Error parsing orders:',error);
        }
    }
    const renderOrders=()=>{
        return (
            <div>
                {orders.map((order,index)=>(
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
                    </div>
                ))}
            </div>
        )
    }
    const calculateTotalPrice=(cartDetails)=>{
        return cartDetails.reduce((total,item)=>total+(item.Price * item.quan),0);
    }
    const totalOrders=orders.length;
    const totalOrderPrice=orders.reduce((total,order)=>total+calculateTotalPrice(order.cartDetails),0)
    const maxOrder=Math.max(...orders.map(order=>calculateTotalPrice(order.cartDetails)));
    const minOrder=Math.min(...orders.map(order=>calculateTotalPrice(order.cartDetails)));
    const averageOrder=totalOrderPrice/totalOrders;

  return (
     <div style={{display:'flex' , flexDirection:'row' ,justifyContent:'space-between'}}>
        <div style={{flex:'1',paddingRight:'20px',paddingLeft:'300px',overflowY:'scroll', textAlign:'left'}}>
            {orders.length !== 0 ? renderOrders() : <p>No past orders</p>}
        </div>
        <div style={{position:'fixed',right:'20px',top:'0',paddingRight:'50px'}}>
            <h2>Total Money Spent : {totalOrderPrice}</h2>
            <h2>Total Number of Orders :{totalOrders}</h2>
            <h2>max Order: {maxOrder}</h2>
            <h2>Min Order: {minOrder}</h2>
            <h2>Average Order: {averageOrder}</h2>
        </div>
     </div> 
  )
}

export default RollUpData

