import React from "react";
import { currencyFormatter } from "../util/formatting";
const CartItem = ({ item }) => {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-action">
        <button>-</button>
        <button>{item.quantity}</button>
        <button>+</button>
      </p>
    </li>
  );
};

export default CartItem;
