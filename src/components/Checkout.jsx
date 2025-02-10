import React, { useContext } from "react";
import CartContext from "../store/CartContext";

const Checkout = () => {
  const { items,cartTotal } = useContext(CartContext);


  return (
    <form action="">
      <h2>Checkout</h2>
      <P>Total Amount: </P>
    </form>
  );
};

export default Checkout;
