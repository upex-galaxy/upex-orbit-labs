import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerInfo, PaymentMethod } from '../types/checkout';
import productsData from '../../app/data/products.json';

export const useCheckout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(Array.from(items));
      calculateTotal(Array.from(items));
    }
  }, []);

  const calculateTotal = (items: string[]) => {
    const sum = items.reduce((acc, id) => {
      const product = productsData.find((p) => p.id === id);
      return acc + (product?.price || 0);
    }, 0);
    setTotal(sum);
  };

  const continueShopping = () => {
    router.push("/orbit-labs/inventory");
  };

  return {
    currentStep,
    setCurrentStep,
    cartItems,
    total,
    buyerInfo,
    setBuyerInfo,
    paymentMethods,
    setPaymentMethods,
    continueShopping
  };
};