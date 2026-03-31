import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (asyncFn) => {
    setIsLoading(true);
    try {
      const result = await asyncFn();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const Spinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-barber-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return { isLoading, withLoading, Spinner, setIsLoading };
};
