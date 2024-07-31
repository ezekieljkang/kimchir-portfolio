import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordPrompt = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { password });
      const { token, redirectTo } = response.data;

      // Store the token in localStorage or cookies
      localStorage.setItem('token', token);

      // Redirect to the protected page
      router.push(redirectTo);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasswordPrompt;
