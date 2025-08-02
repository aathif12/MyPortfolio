import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DarkMode from "./DarkMode";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <DarkMode />
      {/* <a href="#" className="logo">
        Portfolio
      </a> */}
      {/* Dark mode toggle button */}
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
        <a href="#skills" onClick={() => setIsMenuOpen(false)}>
          Skills
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
