import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = ({ title, isAuthenticated, onLogout, userEmail }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header-container">
      <h1 className="header-title">
        <Link to="/" className="text-white text-decoration-none hover:text-gray-300">
          {title}
        </Link>
      </h1>
      {isAuthenticated && (
        <Dropdown show={isDropdownOpen} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <Dropdown.Toggle variant="primary" className="bg-blue-600 border-none">
            <span>{userEmail}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="dropdown-menu-custom">
            <Dropdown.Item onClick={onLogout} className="dropdown-item-custom logout-button">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;