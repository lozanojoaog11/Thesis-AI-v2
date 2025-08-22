
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea
      {...props}
      className="w-full h-40 bg-brand-dark font-mono text-brand-light border-2 border-brand-gray rounded-md focus:border-white focus:outline-none focus:ring-0 transition-colors duration-300 p-3 text-lg resize-none"
    />
  );
};
