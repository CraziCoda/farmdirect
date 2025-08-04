import type { Route } from "./+types/orders";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Orders - FarmDirect" },
    { name: "description", content: "View orders for your products" },
  ];
}

const dummyOrders = [
  { id: 1, product: "Organic Tomatoes", quantity: 10, buyer: "john@example.com", status: "Pending", date: "2024-01-15" },
  { id: 2, product: "Fresh Carrots", quantity: 5, buyer: "mary@example.com", status: "Confirmed", date: "2024-01-14" },
  { id: 3, product: "Sweet Corn", quantity: 8, buyer: "bob@example.com", status: "Delivered", date: "2024-01-13" },
  { id: 4, product: "Organic Tomatoes", quantity: 15, buyer: "alice@example.com", status: "Pending", date: "2024-01-12" },
];

export default function Orders() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Product Orders</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Product</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Quantity</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Buyer</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Date</th>
                <th className="px-6 py-3 text-left text-gray-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-800">{order.product}</td>
                  <td className="px-6 py-4 text-gray-600">{order.quantity} units</td>
                  <td className="px-6 py-4 text-gray-600">{order.buyer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={order.status}
                      className="px-3 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:border-green-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}