// components/CopyToClipboard.tsx
'use client';

import React, { useRef } from 'react';

const CopyToClipboard: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      // Alternatively, you can use the Clipboard API:
      // navigator.clipboard.writeText(textareaRef.current.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <textarea
        ref={textareaRef}
        className="w-full max-w-lg p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4"
        rows={10}
        placeholder="Enter text here..."
      />
      <button
        onClick={handleCopyClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default CopyToClipboard;
