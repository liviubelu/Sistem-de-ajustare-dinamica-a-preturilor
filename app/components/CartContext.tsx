'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  sneakerId: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: number; 
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Verifică dacă există deja produs cu aceeași id și mărime
      const existingIndex = prev.findIndex(ci => ci.id === item.id && ci.size === item.size);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size: number) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, totalPrice, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
