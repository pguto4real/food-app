import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const Header = () => {
  const { items } = useContext(CartContext);

  const cartQuantity = items.length
  const totalCartItems = items.reduce((totalNumbersOfItems, item) => {
    return totalNumbersOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="food app logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({cartQuantity})</Button>
      </nav>
    </header>
  );
};

export default Header;
