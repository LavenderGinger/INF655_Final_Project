import { createContext, useContext, useState } from "react";

// Creating a new context for the cart.
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (event, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === event.id);
      if (existing) {
        return prev.map(item =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...event, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Removes an item from the cart based on its id.
  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Calculate the total price of all items in the cart.
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);