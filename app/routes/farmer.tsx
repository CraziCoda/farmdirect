import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchMyProducts, addProduct, deleteProduct } from '../store/productSlice';
import type { RootState, AppDispatch } from '../store/store';
import type { Route } from "./+types/farmer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Farmer Dashboard - FarmDirect" },
    { name: "description", content: "Manage your products" },
  ];
}

export default function Farmer() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const { user } = useSelector((state: RootState) => state.user);
  const { myProducts } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accountType !== 'farmer') {
      navigate('/signin');
    } else {
      dispatch(fetchMyProducts());
    }
  }, [user, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct({ name, price: Number(price), quantity: Number(quantity) }));
    setName('');
    setPrice('');
    setQuantity('');
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
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
            {myProducts.map((product) => (
              <div key={product._id} className="flex justify-between items-center p-4 border border-gray-200 rounded">
                <div>
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">${product.price} - {product.quantity} units</p>
                </div>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
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