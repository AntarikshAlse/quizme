'use client';

import { useEffect } from 'react';

export default function QuizError({
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
        Failed to load quiz
      </h2>

      <p className="text-gray-600 mt-2">
        This quiz could not be loaded.
      </p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}