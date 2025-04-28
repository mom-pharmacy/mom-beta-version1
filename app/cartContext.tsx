import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  
  const [cartItems, setCartItems] = useState([]);
  useEffect(()=> {
    loadCartItems();
    
  },[])

  useEffect(()=>{
    AsyncStorage.setItem("carts", JSON.stringify(cartItems));
  } , [cartItems])
  
  const loadCartItems = async()=>{
    let carts = await AsyncStorage.getItem("carts");
    carts = carts?JSON.parse(carts):[];
    console.log("carts:", carts);
    setCartItems(carts);
  }

  const addToCart = async (item) => {
  const newItem = { ...item, quantity: 1 };
  const existingCart = cartItems || [];

  const updatedCart = [...existingCart, newItem];

  await AsyncStorage.setItem("carts", JSON.stringify(updatedCart));
  setCartItems(updatedCart);

  console.log("Cart Updated:", updatedCart.length);
};


  const incrementItem = async (itemId) => {
    
      const updatedCart = cartItems.map(item =>
        item._id === itemId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    
      await AsyncStorage.setItem("carts", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    };
    
 

  const decrementItem = async (itemId) => {
  setCartItems(prevCart => {
    const fileter = prevCart.filter(item => item._id !== itemId);
    const updatedCart = prevCart.map(item =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Save updatedCart to AsyncStorage
    AsyncStorage.setItem("carts", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId)); //
    console.log("this is from" , cartItems)
    AsyncStorage.setItem("carts", JSON.stringify(cartItems));
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