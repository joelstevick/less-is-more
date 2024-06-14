// components/ScrollableText.js
import React from "react";
import DOMPurify from "dompurify";
interface ScrollableTextProps {
  content: string;
}
const ScrollableText: React.FC<ScrollableTextProps> = ({ content }) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : DOMPurify.sanitize("");

  return (
    <div
      className="p-4 border border-blue-300 dark:border-blue-700 rounded-lg shadow-sm bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 overflow-y-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export default ScrollableText;
