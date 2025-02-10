import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  shorCart: () => {},
  hideCart: () => {},
  showChechkout: () => {},
  hideChechkout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  return (
    <UserProgressContext value={UserProgressContext}>
      {children}
    </UserProgressContext>
  );
}
export default UserProgressContext;
