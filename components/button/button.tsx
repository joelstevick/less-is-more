// components/Button.js
import React from "react";

const Button = ({ children }: { children: any }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      {children}
    </button>
  );
};

export default Button;
