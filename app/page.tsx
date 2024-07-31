'use client'; // Ensure this component is client-side

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordPrompt = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { password });
      localStorage.setItem('token', res.data.token);
      router.push('/protected'); // Redirect to protected content
    } catch (error) {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default PasswordPrompt;
