import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from '../components/Admin';
import { ArrowLeft } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate the password against a secure backend
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const BackButton = () => (
    <button
      onClick={handleBack}
      className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
    >
      <ArrowLeft className="w-5 h-5 mr-1" />
      Back to Main Page
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-4">
          <BackButton />
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 border rounded mb-4"
            />
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <BackButton />
        <Admin onClose={() => setIsLoggedIn(false)} />
      </div>
    </div>
  );
};

export default AdminPage;