// components/TextareaComponent.js
import React from 'react';

const TextareaComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <textarea
        className="w-full max-w-lg p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Type here..."
        rows={6}
      />
    </div>
  );
};

export default TextareaComponent;
