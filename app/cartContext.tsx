import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const newItem = {
      ...item , quantity:1
    }
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const incrementItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrementItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems , addToCart, removeFromCart  , incrementItem , decrementItem}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}