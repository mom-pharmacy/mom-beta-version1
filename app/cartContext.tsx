import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart1: { [key: string]: number };
  addToCart: (itemKey: string) => void;
  incrementItem: (itemKey: string) => void;
  decrementItem: (itemKey: string) => void;
  removeFromCart: (itemKey: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart1, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (itemKey: string) => {
    setCart((prev) => ({
      ...prev,
      [itemKey]: (prev[itemKey] || 0) + 1,
    }));
  };

  const incrementItem = (itemKey: string) => {
    setCart((prev) => ({
      ...prev,
      [itemKey]: (prev[itemKey] || 0) + 1,
    }));
  };

  const decrementItem = (itemKey: string) => {
    setCart((prev) => {
      const count = (prev[itemKey] || 0) - 1;
      if (count <= 0) {
        const updated = { ...prev };
        delete updated[itemKey];
        return updated;
      }
      return { ...prev, [itemKey]: count };
    });
  };

  const removeFromCart = (itemKey: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[itemKey];
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalItems = Object.values(cart1).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider
      value={{
        cart1,
        addToCart,
        incrementItem,
        decrementItem,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
