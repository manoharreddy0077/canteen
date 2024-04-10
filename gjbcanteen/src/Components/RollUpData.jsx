import React from 'react';
import { useLocation } from 'react-router-dom';
import User from './MenuList/User';
import './RollUp.css';
import { useSelector } from 'react-redux';

const RollUpData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ordersParam = queryParams.get('Orders');
    let orders = [];
    if (ordersParam) {
        try {
            orders = JSON.parse(decodeURIComponent(ordersParam));
            console.log(typeof orders);
        } catch (error) {
            console.error('Error parsing orders:', error);
        }
    }

    const renderOrders = () => {
        return (
            <div className='orders-render'>
                {orders.map((order, index) => {
                    const cartTotal = calculateTotalPrice(order.cartDetails);
                    return (
                        <div className="order-details" key={index}>
                            <h4>Order Number : {order.orderNumber}</h4>
                            <div className="order-items">
                                <div className="order-items-headings">
                                    <p>Items</p>
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <p>Canteen</p>
                                </div>
                                <div className="order-items-list">
                                    {order.cartDetails.map((item, idx) => (
                                        <div className="order-item" key={idx}>
                                            <p>{item.Item}</p>
                                            <p>Rs.{item.Price}</p>
                                            <p>{item.quan}</p>
                                            <p>{item.canteen}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="details-total">Cart Total: Rs.{cartTotal}/-</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const calculateTotalPrice = (cartDetails) => {
        return cartDetails.reduce((total, item) => total + (item.Price * item.quan), 0);
    };
    const totalOrders = orders.length;
    const totalOrderPrice = orders.reduce((total, order) => total + calculateTotalPrice(order.cartDetails), 0);
    const maxOrder = Math.max(...orders.map(order => calculateTotalPrice(order.cartDetails)));
    const minOrder = Math.min(...orders.map(order => calculateTotalPrice(order.cartDetails)));
    const averageOrder = totalOrderPrice / totalOrders;

    return (
        <div className='rollup-container'>
            <div className='rollup-heading'>
                <p>Roll-Up</p>
            </div>
            <div className='orders-container'>
                {orders.length !== 0 ? renderOrders() : <p>No past orders</p>}
            </div>
            <div>
                <div className="user-summary">
                    <div>
                        <User />
                    </div>
                    <div className="summary">
                        <h2>Total Money Spent : {totalOrderPrice}</h2>
                        <h2>Total Number of Orders :{totalOrders}</h2>
                        <h2>max Order: {maxOrder}</h2>
                        <h2>Min Order: {minOrder}</h2>
                        <h2>Average Order: {averageOrder}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RollUpData;
