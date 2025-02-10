import React, { useContext } from "react";
import CartContext from "../store/CartContext";

const Checkout = () => {
  const { items } = useContext(CartContext);

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  return (
    <form action="">
      <h2>Checkout</h2>
      <P>Total Amount: </P>
    </form>
  );
};

export default Checkout;
