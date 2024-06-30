import React from "react";
import "./DarkMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Darkmode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <div className="dark_mode">
      <input
        type="checkbox"
        className="dark_mode_input"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label
        for="checkbox"
        className="dark_mode_label"
        htmlFor="darkmode-toggle"
      >
        <FontAwesomeIcon icon={faSun} className="fa-sun " />
        <FontAwesomeIcon icon={faMoon} className="fa-moon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default Darkmode;
