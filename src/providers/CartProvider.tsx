import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  nameKey: string;
  price: number;
  emoji: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = '@app:cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    };
    loadCart();
  }, []);

  const persistCart = useCallback(async (newItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } catch {
      // ignore
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        let newItems: CartItem[];
        if (existing) {
          newItems = prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...prev, { ...item, quantity: 1 }];
        }
        persistCart(newItems);
        return newItems;
      });
    },
    [persistCart]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const newItems = prev.filter((i) => i.id !== id);
        persistCart(newItems);
        return newItems;
      });
    },
    [persistCart]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      setItems((prev) => {
        let newItems: CartItem[];
        if (quantity <= 0) {
          newItems = prev.filter((i) => i.id !== id);
        } else {
          newItems = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
        }
        persistCart(newItems);
        return newItems;
      });
    },
    [persistCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    persistCart([]);
  }, [persistCart]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
