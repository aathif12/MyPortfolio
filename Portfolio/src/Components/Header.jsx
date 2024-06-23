import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"; // Import CSS file for header styles
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <a href="#" className="logo">
        Portfolio
      </a>
      <FontAwesomeIcon
        icon={faBars}
        id="menu-icon"
        onClick={toggleMenu} // Toggle menu visibility on click
      />
      <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <a href="#home" onClick={() => setIsMenuOpen(false)}>
          Home
        </a>
        <a href="#about" onClick={() => setIsMenuOpen(false)}>
          About
        </a>
        <a href="#services" onClick={() => setIsMenuOpen(false)}>
          Services
        </a>
        <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>
          Portfolio
        </a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
