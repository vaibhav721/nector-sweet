import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';
import { mobileApi } from '../lib/api';

type CartContextValue = {
  cart: any;
  refresh: () => Promise<void>;
  addOneTime: (variantId: string) => Promise<void>;
  addSubscription: (variantId: string) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export const MobileCartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<any>(null);

  const refresh = async () => {
    const response = await mobileApi.get('/cart');
    setCart(response.data.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const addOneTime = async (variantId: string) => {
    const response = await mobileApi.post('/cart/items', {
      variantId,
      quantity: 1,
      purchaseMode: 'ONE_TIME'
    });
    setCart(response.data.data);
  };

  const addSubscription = async (variantId: string) => {
    const response = await mobileApi.post('/cart/items', {
      variantId,
      quantity: 1,
      purchaseMode: 'SUBSCRIPTION',
      frequency: 'DAILY'
    });
    setCart(response.data.data);
  };

  const remove = async (itemId: string) => {
    const response = await mobileApi.delete(`/cart/items/${itemId}`);
    setCart(response.data.data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        refresh,
        addOneTime,
        addSubscription,
        remove
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useMobileCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useMobileCart must be used within MobileCartProvider');
  }
  return context;
};
