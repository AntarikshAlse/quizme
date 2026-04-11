'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        Failed to load quizzes
      </h2>

      <p className="text-gray-600 mt-2">
        Something went wrong. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Retry
      </button>
    </div>
  );
}