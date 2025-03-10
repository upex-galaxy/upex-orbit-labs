"use client";
import Products from "@/components/ui/orbit-labs/inventory";

export default function InventoryPage() {
  return (
<div className="min-h-screen p-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center gap-1">
      <h1 className="text-3xl font-bold">Inventory - Practice UPEX</h1>
    </div>
    <Products />
  </div>
</div>
  );
}
