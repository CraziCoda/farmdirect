import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, fetchProfile } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - FarmDirect" },
    { name: "description", content: "Create your FarmDirect account" },
  ];
}

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'farmer' | 'buyer'>('farmer');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile()).then((result) => {
        if (result.payload?.accountType === 'farmer') {
          window.location.href = '/farmer';
        } else {
          window.location.href = '/buyer';
        }
      });
    }
  }, [isAuthenticated, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, accountType }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
            <div className="flex space-x-4">
              <label className="flex items-center text-gray-700">
                <input 
                  type="radio" 
                  name="userType" 
                  value="farmer" 
                  checked={accountType === 'farmer'}
                  onChange={(e) => setAccountType(e.target.value as 'farmer')}
                  className="mr-2" 
                />
                Farmer
              </label>
              <label className="flex items-center text-gray-700">
                <input 
                  type="radio" 
                  name="userType" 
                  value="buyer" 
                  checked={accountType === 'buyer'}
                  onChange={(e) => setAccountType(e.target.value as 'buyer')}
                  className="mr-2" 
                />
                Buyer
              </label>
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-green-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}