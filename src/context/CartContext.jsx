import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('voltix-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('voltix-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast("Product added to cart.", "success");
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast("Product removed from cart.", "success");
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const discount = originalTotal - subtotal;
    const delivery = subtotal > 1000 || subtotal === 0 ? 0 : 50;
    const total = subtotal + delivery;
    return { subtotal, originalTotal, discount, delivery, total };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount, getCartTotals }}>
      {children}
    </CartContext.Provider>
  );
};
