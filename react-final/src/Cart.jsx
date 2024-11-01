import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "./store";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // State for the general discount and coupon
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Function to calculate total, discount, and final amount
  const calculateTotalWithDiscount = (items, discountPercentage, couponDiscount) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (total * discountPercentage) / 100;
    const couponAmount = (total * couponDiscount) / 100;
    const netAmount = total - discountAmount - couponAmount;

    return { total, discountAmount, couponAmount, netAmount };
  };

  // Function to validate coupon codes and set coupon discount
  const applyCoupon = () => {
    switch (couponCode.toUpperCase()) {
      case "RAVI10":
        setCouponDiscount(10);
        break;
      case "RAVI20":
        setCouponDiscount(20);
        break;
      case "RAVI30":
        setCouponDiscount(30);
        break;
      default:
        alert("Invalid coupon code");
        setCouponDiscount(0);
    }
  };

  // Calculate totals with the current discount and coupon discount applied
  const { total, discountAmount, couponAmount, netAmount } = calculateTotalWithDiscount(cartItems, discount, couponDiscount);

  return (
    <>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.name}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(incrementQuantity({ name: item.name }))}>+</button>
              <button onClick={() => dispatch(decrementQuantity({ name: item.name }))}>-</button>
              <button onClick={() => dispatch(removeFromCart({ name: item.name }))}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {/* Display total, discount amount, coupon discount, and final net amount */}
      <div>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={() => setDiscount(10)}>Apply 10% Discount</button>
        <button onClick={() => setDiscount(20)}>Apply 20% Discount</button>
        <button onClick={() => setDiscount(30)}>Apply 30% Discount</button>
        <p>Discount Amount: ${discountAmount.toFixed(2)} ({discount}%)</p>

        {/* Coupon Input and Apply Button */}f
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter the coupon code"
        />
        <button onClick={applyCoupon}>Apply Coupon</button>

        <p>Coupon Discount: ${couponAmount.toFixed(2)} ({couponDiscount}%)</p>
        <h3>Net Amount: ${netAmount.toFixed(2)}</h3>
      </div>
    </>
  );
};

export default Cart;
