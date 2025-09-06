import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const q = Number(quantity) || 1;
      const p = Number(product.price) || 0;
      const stock = typeof product.stockCount === 'number' ? product.stockCount : 100;
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 1) + q, price: p, stockCount: stock }
            : item
        );
      }
      return [...prev, { ...product, quantity: q, price: p, stockCount: stock }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: Number(quantity) || 1 } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
