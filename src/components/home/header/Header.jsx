import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title, isAuthenticated, onLogout, userEmail }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">
        <Link to="/" className="hover:underline">
          {title}
        </Link>
      </h1>
      {isAuthenticated && (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            <span>{userEmail}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <button
                onClick={onLogout}
                className="bg-red-500 block w-full px-4 py-2 text-sm text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
