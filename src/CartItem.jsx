import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;

    cart.forEach((item) => {
      totalAmount += parseInt(item.cost.replace('$','')) * item.quantity; // was $20 -> remove $ char and parseInt
    })

    return totalAmount;
  };

  // return to plant listing page
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // alert user that functionality will be implemented
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    const itemIncr = {...item};
    itemIncr.quantity++;
    dispatch(updateQuantity(itemIncr));
  };

  const handleDecrement = (item) => {
    const itemDecr = {...item};
    // if only one in cart remove it
    if (itemDecr.quantity == 1){
      dispatch(removeItem(itemDecr));
    }else{
      itemDecr.quantity--;
      dispatch(updateQuantity(itemDecr));
    }
  };

  const handleRemove = (item) => {
    const itemToRemove = {...item};
    dispatch(removeItem(itemToRemove));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalAmount = 0;
    totalAmount = item.quantity * parseInt(item.cost.replace('$',''));
    
    return totalAmount;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1"onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;