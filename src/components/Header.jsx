import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const cartQuantity = items.length;


  function handleShowCart() {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="food app logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({cartQuantity})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
