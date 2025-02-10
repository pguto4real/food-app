import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";

const Checkout = () => {
  const { items, cartTotal } = useContext(CartContext);

  return (
    <form action="">
      <h2>Checkout</h2>
      <P>Total Amount:{currencyFormatter.format(cartTotal)} </P>
    </form>
  );
};

export default Checkout;
