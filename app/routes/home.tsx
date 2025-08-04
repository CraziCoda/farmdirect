import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FarmDirect" },
    { name: "description", content: "Welcome to FarmDirect" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">FarmDirect</h1>
        <p className="text-gray-600 mb-8">Connect directly with local farmers</p>
        <div className="space-x-4">
          <a href="/signup" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Sign Up
          </a>
          <a href="/signin" className="bg-white text-green-600 px-6 py-2 rounded border border-green-600 hover:bg-green-50">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
