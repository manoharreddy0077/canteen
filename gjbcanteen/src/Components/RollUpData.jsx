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
                            <h4 className="order-number">Order Number: {order.orderNumber}</h4>
                            <div className="order-items">
                                {order.cartDetails.map((item, idx) => (
                                    <div className="order-item-card" key={idx}>
                                        <p className="itemname">{item.Item}</p>
                                        <p className="price">Rs.{item.Price}</p>
                                        <p className="quantity">{item.quan}</p>
                                        <p className="canteen">{item.canteen}</p>
                                    </div>
                                ))}
                                
                            </div>
                            <p className="details-total">Cart Total: Rs.{cartTotal}/-</p>
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
            <div className="user-summary">
                <div>
                    <User />
                </div>
                <div className="summary">
                    <h2>Total Money Spent: {totalOrderPrice}</h2>
                    <h2>Total Number of Orders: {totalOrders}</h2>
                    <h2>Max Order: {maxOrder}</h2>
                    <h2>Min Order: {minOrder}</h2>
                    <h2>Average Order: {averageOrder}</h2>
                </div>
            </div>
        </div>
    );
};

export default RollUpData;
