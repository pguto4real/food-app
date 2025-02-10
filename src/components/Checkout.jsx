import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Modal from "./Modal";
import UserProgressContext from "../store/UserProgressContext";

const Checkout = () => {
  const { items, cartTotal } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);

  function handleHideCart() {
    hideCart();
  }
  return (
    <Modal open={progress === "checkout"}>
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id={"full-name"} />
        <Input label="Email Address" type="email" id={"email"} />
        <Input label="Street" type="text" id={"street"} />
        <div className="control-row">
          <Input label="Postal Code" type="text" id={"postal-code"} />
          <Input label="City" type="text" id={"city"} />
        </div>
        <p className="modal-actions">
          <Button textOnly onClick={handleHideCart}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
