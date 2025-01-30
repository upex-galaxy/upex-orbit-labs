import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerInfo, PaymentMethod } from '../types/checkout';
import productsData from '../../app/data/products.json';
import { STORAGE_KEYS } from '../utils/constants';
import { useLanguage } from "../context/LanguageContext";

export const useCheckout = () => {
  const { language } = useLanguage();
  const PRODUCTS = language === 'en' ? productsData.english : productsData.spanish;
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BUYER_INFO) || '[]');
    }
    return [];
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS) || '[]');
    }
    return [];
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(Array.from(items));
      calculateTotal(Array.from(items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUYER_INFO, JSON.stringify(buyerInfo));
  }, [buyerInfo]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const calculateTotal = (items: string[]) => {
    const sum = items.reduce((acc, id) => {
      const product = PRODUCTS.find((p) => p.id === id);
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