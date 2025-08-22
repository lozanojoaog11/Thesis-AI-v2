
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full bg-brand-dark font-mono text-brand-light border-b-2 border-brand-gray focus:border-white focus:outline-none focus:ring-0 transition-colors duration-300 p-2 text-lg"
    />
  );
};
