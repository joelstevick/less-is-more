// components/button/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, type = "button"}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`py-2 px-4 bg-blue-500 text-white rounded ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
    >
      {children}
    </button>
  );
};

export default Button;
