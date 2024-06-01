// components/TextareaComponent.js
import React from 'react';

const TextareaComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <textarea
        className="w-full max-w-lg p-4 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 placeholder-blue-400 dark:placeholder-blue-500"
        placeholder="Type your message here..."
        rows={6} // rows should be a number, not a string
      />
    </div>
  );
};

export default TextareaComponent;
