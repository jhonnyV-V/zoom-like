import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Link to="/">
      <header className="min-h-5 mb-12 flex flex-col items-center justify-center bg-[#282c34] text-white">
        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent">
          Another Zoom Like Web App
        </p>
      </header>
    </Link>
  );
};

export default Header;
