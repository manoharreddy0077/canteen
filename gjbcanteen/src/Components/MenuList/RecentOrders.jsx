import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, clearCart } from '../../store/actions.mjs';
import './RecentOrders.css';

const RecentOrders = ({ recentOrdersData }) => {
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

    return (
        <div className="recent-orders-container-unique">
            <h1>Recent Orders</h1>
            {recentOrdersData.map((order, index) => (
                <div className="order-details-unique" key={index}>
                    <h4>Order Number: {order.orderNumber}</h4>
                    <div className="order-items-unique">
                        <div className="order-items-headings-unique">
                            <div className="menu-heading-unique"><p>Items</p></div>
                            <div className="menu-heading-unique"><p>Price</p></div>
                            <div className="menu-heading-unique"><p>Quantity</p></div>
                            <div className="menu-heading-unique"><p>Canteen</p></div>
                        </div>
                        <div className="order-items-list-unique">
                            {order.cartDetails.map((item, idx) => (
                                <div className="order-item-unique" key={idx}>
                                    <p>{item.Item}</p>
                                    <p>Rs.{item.Price}</p>
                                    <p>{item.quan}</p>
                                    <p>{item.canteen}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="total-checkout-unique">
                        <p>Total Price: Rs. {calculateTotalPrice(order.cartDetails)}</p>
                        <button onClick={() => handleCheckOut(order)}>CheckOut</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const calculateTotalPrice = (cartDetails) => {
    return cartDetails.reduce((total, item) => total + (item.Price * item.quan), 0);
};

export default RecentOrders;
