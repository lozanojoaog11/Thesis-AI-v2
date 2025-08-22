import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size, children, className, ...props }) => {
  const baseClasses = "rounded-md font-sans font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark";
  
  const variantClasses = {
    primary: "bg-brand-light text-brand-dark hover:bg-white focus:ring-white disabled:bg-brand-gray disabled:cursor-not-allowed",
    secondary: "bg-transparent border-2 border-brand-gray text-brand-light hover:bg-brand-gray hover:text-white focus:ring-brand-light"
  };

  const sizeClasses = size === 'lg' ? 'px-8 py-3 text-xl' : 'px-6 py-2 text-lg';

  const finalClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      className={finalClassName}
    >
      {children}
    </button>
  );
};
