import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";

import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, cartTotal, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  function handleHideCart() {
    hideCart();
  }
  function handleShowCheckout() {
    showCheckout();
  }
  const cartQuantity = items.length;

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {cartQuantity > 0 && (
          <Button onClick={handleShowCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
