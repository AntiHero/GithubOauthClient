import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router]);

  return <h1>Welcome, Home</h1>;
};

export default HomePage;
