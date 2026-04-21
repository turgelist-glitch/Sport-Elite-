import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sportshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sportshop_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize) => {
    setCartItems(prev => {
      const key = `${product.id}-${selectedSize}`;
      const existing = prev.find(item => item.cartKey === key);
      if (existing) {
        return prev.map(item =>
          item.cartKey === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize, quantity: 1, cartKey: key }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.cartKey === cartKey ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
