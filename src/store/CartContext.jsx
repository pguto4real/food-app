import { act, createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  cartTotal: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const extistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (extistingCartItemIndex > -1) {
      const existingCartItem = state.items[extistingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[extistingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    const cartTotal = updatedItems.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
    }, 0);

    return {
      ...state,
      items: updatedItems,
      cartTotal: cartTotal,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const extistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[extistingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(extistingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[extistingCartItemIndex] = updatedItem;
    }

    const cartTotal = updatedItems.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
    }, 0);
    return {
      ...state,
      items: updatedItems,
      cartTotal: cartTotal,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
      cartTotal: 0,
    };
  }

  return state;
}
export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cartState.items,
    cartTotal: cartState.cartTotal ? cartState.cartTotal : 0,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
