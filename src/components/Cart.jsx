import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";

import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

const Cart = () => {
  const { items } = useContext(CartContext);
  console.log(items);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} -{item.price}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-action">
        <Button textOnly>Close</Button>
        <Button>Go to checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
