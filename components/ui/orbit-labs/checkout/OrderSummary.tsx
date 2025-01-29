import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/orbit-labs/card";
import productsData from '../../../../app/data/products.json';

interface OrderSummaryProps {
  cartItems: string[];
  total: number;
  onContinueShopping: () => void;
}

export const OrderSummary = ({ cartItems, total, onContinueShopping }: OrderSummaryProps) => {
  return (
    <div className="w-96">
      <button
        onClick={onContinueShopping}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Back to shopping
      </button>
      <Card className="bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
          {cartItems.map((id) => {
            const product = productsData.find((p) => p.id === id);
            if (!product) return null;

            return (
              <div key={id} className="flex items-center mb-4">
                <div className="relative h-16 w-16 mr-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-gray-300">${product.price}</p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-gray-700 mt-4 pt-4">
            <div className="flex justify-between text-white">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};