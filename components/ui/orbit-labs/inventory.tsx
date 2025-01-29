"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { Product } from "../../../lib/utils";
import productsData from "../../../app/data/products.json";
import { ShoppingCart } from "lucide-react";

const PRODUCTS: Product[] = productsData;

export default function Products() {
  const router = useRouter();
  const [cart, setCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(new Set(JSON.parse(savedCart)));
    }
  }, []);

  const updateCart = (productId: string) => {
    const newCart = new Set(cart);
    if (cart.has(productId)) {
      newCart.delete(productId);
    } else {
      newCart.add(productId);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Array.from(newCart)));
  };

  const viewCart = () => {
    router.push("/orbit-labs/cart");
  };

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <button
          id="view-cart"
          onClick={viewCart}
          className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({cart.size})
        </button>
      </div>
      <div
        id="card-container"
        className="flex items-center justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8"
      >
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            className="border border-gray-700 bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg bg-white bg-opacity-10 p-2 rounded"
          >
            <div className="relative h-96">
              <Link
                href={product.courseUrl}
                className="absolute top-2 right-2 z-10 w-8 h-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/upex.ico"
                  alt="UPEX"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </Link>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "contain" }}
                className="p-2"
              />
            </div>
            <CardContent className="mt-4">
              <h2 className="text-2xl font-bold text-white mb-2 bg-white bg-opacity-10 p-2 rounded">
                {product.name}
              </h2>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">
                  ${product.price}
                </span>
                <button
                  id="add-to-cart"
                  onClick={() => updateCart(product.id)}
                  className={`px-6 py-2 rounded ${
                    cart.has(product.id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {cart.has(product.id) ? "Remove" : "Add to Cart"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
