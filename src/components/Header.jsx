import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-400 to-purple-800 py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white text-3xl font-bold hover:text-gray-200">
          My Posts
        </Link>
        <nav>
          <Link to="/" className="text-white mr-4 hover:text-gray-200">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
