import React from "react";
import nav from "../assets/nav.svg";
const Header = () => {
  return (
    <header className="header">
      <a href="#" className="logo">
        Portfolio
      </a>
      <img src={nav} className="navImg" />
      <nav className="navbar">
        <a href="#" className="active">
          Home
        </a>
        <a href="#" className="active">
          About
        </a>
        <a href="#" className="active">
          Services
        </a>
        <a href="#" className="active">
          Portfolio
        </a>
        <a href="#" className="active">
          Contact
        </a>
      </nav>
    </header>
  );
};
export default Header;
