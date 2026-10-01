import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('voltix-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    localStorage.setItem('voltix-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isExist = wishlist.find(item => item.id === product.id);
    if (isExist) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast("Removed from wishlist.", "success");
    } else {
      setWishlist(prev => [...prev, product]);
      showToast("Added to wishlist.", "success");
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showToast("Removed from wishlist.", "success");
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, moveToCart, getWishlistCount, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
