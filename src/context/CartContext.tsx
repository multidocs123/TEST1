import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Freelancer } from '../data/freelancers';

interface CartContextType {
  cart: Freelancer[];
  addToCart: (freelancer: Freelancer) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Freelancer[]>([]);

  const addToCart = (freelancer: Freelancer) => {
    if (!isInCart(freelancer.id)) {
      setCart([...cart, freelancer]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const isInCart = (id: string) => {
    return cart.some(item => item.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};