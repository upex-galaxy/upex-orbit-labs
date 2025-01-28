"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/orbit-labs/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import productsData from "../../../app/data/products.json";
import DropdownMenu from "../../../app/orbit-labs/login/dropdownMenu";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  courseUrl: string;
}

const PRODUCTS: Product[] = productsData;

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

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
            <DropdownMenu />
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          </div>
          <button
            id="continue-shopping"
            onClick={continueShopping}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300">Your cart is empty</p>
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
                        Remove
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
                onClick={continueCheckout}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
