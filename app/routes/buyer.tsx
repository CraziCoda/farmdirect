import type { Route } from "./+types/buyer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Buyer Dashboard - FarmDirect" },
    { name: "description", content: "Browse and order products" },
  ];
}

const dummyProducts = [
  { id: 1, name: "Organic Tomatoes", price: 5.99, farmer: "Green Valley Farm", available: 50 },
  { id: 2, name: "Fresh Carrots", price: 3.49, farmer: "Sunny Acres", available: 30 },
  { id: 3, name: "Sweet Corn", price: 4.99, farmer: "Harvest Hills", available: 25 },
  { id: 4, name: "Red Apples", price: 6.99, farmer: "Orchard View", available: 40 },
  { id: 5, name: "Lettuce", price: 2.99, farmer: "Green Valley Farm", available: 35 },
];

export default function Buyer() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Available Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">From: {product.farmer}</p>
              <p className="text-green-600 font-bold text-xl mb-2">${product.price}</p>
              <p className="text-gray-500 mb-4">{product.available} units available</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  max={product.available}
                  className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                />
                <span className="text-gray-600">units</span>
              </div>
              
              <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
                Place Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}