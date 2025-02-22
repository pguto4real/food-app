import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Modal from "./Modal";
import UserProgressContext from "../store/UserProgressContext";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const { items, cartTotal, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const { fetchedData, error, clearData, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
    {},
    "checkout"
  );

  function handleHideCheckout() {
    hideCheckout();
  }
  function handleFinish() {
    clearCart();
    clearData();
    hideCheckout();
  }
  async function checkoutAction(prevState,fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );

  }

  const [formState, formAction, isSending] = useActionState(checkoutAction,null);

  let actions = (
    <>
      <Button textOnly onClick={handleHideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (Object.keys(fetchedData).length !== 0 && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via emailwithin the next few
          minutes
        </p>
        <p>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id={"name"} />
        <Input label="Email Address" type="email" id={"email"} />
        <Input label="Street" type="text" id={"street"} />
        <div className="control-row">
          <Input label="Postal Code" type="text" id={"postal-code"} />
          <Input label="City" type="text" id={"city"} />
        </div>
        {error && <Error title={"Failed to submit order"} message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
