import React from 'react';

export interface LinkProps {
  text: string;
  url: string;
}

const Link: React.FC<LinkProps> = ({ text = '', url = '' }) => {
  return (
    <div>
      <a
        className="text-[#61dafb] transition-all hover:text-blue-400"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  );
};

export default Link;
