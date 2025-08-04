import type { Route } from "./+types/farmer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Farmer Dashboard - FarmDirect" },
    { name: "description", content: "Manage your products" },
  ];
}

const dummyProducts = [
  { id: 1, name: "Organic Tomatoes", price: 5.99, quantity: 50 },
  { id: 2, name: "Fresh Carrots", price: 3.49, quantity: 30 },
  { id: 3, name: "Sweet Corn", price: 4.99, quantity: 25 },
];

export default function Farmer() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Farmer Dashboard</h1>
          <a href="/orders" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Orders
          </a>
        </div>
        
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Price ($)"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Products</h2>
          <div className="space-y-4">
            {dummyProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 border border-gray-200 rounded">
                <div>
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">${product.price} - {product.quantity} units</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}