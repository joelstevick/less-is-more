import React, { forwardRef } from 'react';

interface TextareaProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ name, value, onChange }, ref) => {
  return (
    <textarea
      ref={ref}
      value={value}
      name={name}
      onChange={onChange}
      className="w-full p-4 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 placeholder-blue-400 dark:placeholder-blue-500"
      rows={6}
      placeholder="Type your story here..."
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
