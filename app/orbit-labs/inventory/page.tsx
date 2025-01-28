"use client";
import Products from "@/components/ui/orbit-labs/inventory";

export default function InventoryPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products - Practice UPEX</h1>
        <Products />
      </div>
    </div>
  );
}
