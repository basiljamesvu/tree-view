// Header.js

import React from 'react';
import logo from './resources/abb_logo.png'; // Replace with the actual path to your logo
import './header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="Logo" className="app-logo" />
      <p className="app-title">Tree View Component</p>
    </header>
  );
};

export default Header;
