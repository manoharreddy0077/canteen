import React from 'react';
import { useLocation } from 'react-router-dom';
import User from './MenuList/User';

const RollUpData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ordersParam = queryParams.get('Orders');
    let orders = [];
    if (ordersParam) {
        try {
            orders = JSON.parse(decodeURIComponent(ordersParam));
        } catch (error) {
            console.error('Error parsing orders:', error);
        }
    }

    const renderOrders = () => {
        return (
            <div className="flex flex-col overflow-y-auto h-[34rem] gap-5">
                {orders.map((order, index) => {
                    const cartTotal = calculateTotalPrice(order.cartDetails);
                    return (
                        <div className="flex flex-col bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-5xl gap-4 mb-10" key={index}>
                            <h4 className="text-lg font-semibold mb-4">Order Number: {order.orderNumber}</h4>
                            <div className="flex flex-wrap gap-4">
                                {order.cartDetails.map((item, idx) => (
                                    <div className="bg-white p-4 rounded-md shadow-md" key={idx}>
                                        <p className="font-bold">{item.Item}</p>
                                        <p>Rs.{item.Price}</p>
                                        <p>Quantity: {item.quan}</p>
                                        <p>{item.canteen}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 font-bold">Cart Total: Rs.{cartTotal}/-</p>
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
        <div className="p-6 bg-black-gradient min-h-screen">
            <div className="text-4xl font-black underline text-white mb-12 text-center">Roll-Up</div>
            <div className="flex flex-col-reverse lg:flex-row items-start gap-6">
                <div className="orders-container w-full lg:w-2/3 bg-white bg-opacity-90 p-6 rounded-lg shadow-md overflow-y-auto">
                    {orders.length !== 0 ? renderOrders() : <p>No past orders</p>}
                </div>
                <div className="user-summary w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-5 lg:right-5">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-5">
                        <User />
                    </div>
                    <div className="summary bg-black bg-opacity-70 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Summary</h2>
                        <p>Total Money Spent: Rs.{totalOrderPrice}</p>
                        <p>Total Number of Orders: {totalOrders}</p>
                        <p>Max Order: Rs.{maxOrder}</p>
                        <p>Min Order: Rs.{minOrder}</p>
                        <p>Average Order: Rs.{averageOrder.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RollUpData;
