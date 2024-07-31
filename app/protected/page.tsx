'use client'; // Ensure this component is client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if token exists and is valid
    if (!token) {
      router.push('/'); // Redirect to login page if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Verifying Authentification...</div>; // Or a loading spinner
  }

  return (
    <div>
      <Hero />
    </div>
  );
};

export default ProtectedPage;
