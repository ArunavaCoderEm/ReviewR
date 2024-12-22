"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/'); 
  };

  return (
    <div className="flex items-center justify-center h-screen text-foreground">
      <div className="text-center p-8 bg-muted rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Oops! The page you're looking for cannot be found.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-foreground text-muted rounded-lg hover:bg-muted-foreground transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
