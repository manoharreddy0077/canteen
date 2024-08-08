import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, clearCart } from '../../store/actions.mjs';
import './RecentOrders.css';

const RecentOrders = ({ recentOrdersData }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const cartItems = useSelector(state => state.cart.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCheckOut = (order) => {
        if (cartItems.length !== 0) {
            dispatch(clearCart());
        }
        order.cartDetails.forEach(item => {
            const itemWithCanteen = { ...item, canteen: item.canteen };
            dispatch(addToCart(itemWithCanteen));
        });
        navigate('/ConfirmCartItems');
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="recent-orders-container bg-black-gradient">
            <h1 className="text-white text-4xl">Recent Orders</h1>
            <ul className="orders-list">
                {recentOrdersData.map((order, index) => (
                    <li key={index} onClick={() => setSelectedOrder(order)}>
                        Order Number: {order.orderNumber}
                    </li>
                ))}
            </ul>
            {selectedOrder && (
                <Modal order={selectedOrder} handleCheckOut={handleCheckOut} closeModal={closeModal} />
            )}
        </div>
    );
};

const Modal = ({ order, handleCheckOut, closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h4 className="text-black text-xl font-bold">Order Number: {order.orderNumber}</h4>
                <div className="order-items">
                    {order.cartDetails.map((item, idx) => (
                        <div className="order-item" key={idx}>
                            <p><strong>Item:</strong> {item.Item}</p>
                            <p><strong>Price:</strong> Rs.{item.Price}</p>
                            <p><strong>Quantity:</strong> {item.quan}</p>
                            <p><strong>Canteen:</strong> {item.canteen}</p>
                        </div>
                    ))}
                </div>
                <div className="order-total">
                    <p>Total Price: Rs. {calculateTotalPrice(order.cartDetails)}</p>
                    <button onClick={() => handleCheckOut(order)}>CheckOut</button>
                </div>
            </div>
        </div>
    );
};

const calculateTotalPrice = (cartDetails) => {
    return cartDetails.reduce((total, item) => total + (item.Price * item.quan), 0);
};

export default RecentOrders;
