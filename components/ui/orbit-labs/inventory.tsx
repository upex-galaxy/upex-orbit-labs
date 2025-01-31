import { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { Product } from "../../../lib/utils";
import productsData from "../../../app/data/products.json";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../app/context/LanguageContext";

interface ProductsData {
  english: Product[];
  spanish: Product[];
}

const PRODUCTS_PER_PAGE = 6;
const PRODUCTS_DATA: ProductsData = productsData;

export default function Products() {
  const router = useRouter();
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const { language, t, isLoading } = useLanguage();

  // Seleccionar los productos según el idioma actual
  const PRODUCTS = language === 'en' ? PRODUCTS_DATA.english : PRODUCTS_DATA.spanish;
  
  // Calcular el número total de páginas
  const totalPages = Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE);

  // Obtener los productos de la página actual
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return PRODUCTS.slice(startIndex, endIndex);
  };

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen p-8 bg-transparent">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Inventory - Practice UPEX</h1>
        <button
          id="view-cart"
          onClick={viewCart}
          className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t('pages.inventory.buttons.cart')} ({cart.size})
        </button>
      </div>

      <div
        id="card-container"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      >
        {getCurrentPageProducts().map((product) => (
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
                  {cart.has(product.id) 
                    ? t('pages.inventory.buttons.remove')
                    : t('pages.inventory.buttons.addToCart')}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-gray-700'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}