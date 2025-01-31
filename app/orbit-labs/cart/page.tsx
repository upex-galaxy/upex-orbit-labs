/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/orbit-labs/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import productsData from "../../../app/data/products.json";
import { useLanguage } from "../../context/LanguageContext";

interface ProductsData {
  english: Product[];
  spanish: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  courseUrl: string;
}

const PRODUCTS_DATA: ProductsData = productsData;

export default function CartPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const PRODUCTS = language === 'en' ? PRODUCTS_DATA.english : PRODUCTS_DATA.spanish;

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
      const product = PRODUCTS.find((p) => p.id === id);
      return acc + (product?.price || 0);
    }, 0);
    setTotal(sum);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cartItems.filter((id) => id !== productId);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    calculateTotal(newCart);
  };

  const continueShopping = () => {
    router.push("/orbit-labs/inventory");
  };

  const continueCheckout = () => {
    router.push("/orbit-labs/checkout");
  };

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-1">
            <h1 className="text-3xl font-bold text-white">{t('pages.cart.title')}</h1>
          </div>
          <button
            id="continue-shopping"
            onClick={continueShopping}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {t('pages.cart.buttons.continueShopping')}
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300">{t('pages.cart.emptyCartMessage')}</p>
        ) : (
          <>
            {cartItems.map((id) => {
              const product = PRODUCTS.find((p) => p.id === id);
              if (!product) return null;

              return (
                <Card
                  key={id}
                  className="mb-4 border border-gray-700 bg-transparent"
                >
                  <CardContent className="p-4 flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="relative h-24 w-24 mr-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white">
                        {product.name}
                      </h2>
                      <p className="text-gray-300">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white mb-2">
                        ${product.price}
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        {t('pages.inventory.buttons.remove')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <div className="mt-8 text-right">
              <p className="text-2xl font-bold text-white">
                Total: ${total.toFixed(2)}
              </p>
              <button
                id="proceed-to-checkout"
                onClick={continueCheckout}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                {t('pages.cart.buttons.proceedToCheckout')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}