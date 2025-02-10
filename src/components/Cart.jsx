import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";

import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Cart = () => {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);


  function handleHideCart() {
    hideCart();
  }
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <Modal className="cart" open={progress === "cart"} >
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
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        <Button>Go to checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
