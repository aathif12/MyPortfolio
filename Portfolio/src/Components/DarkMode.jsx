import React from "react";
import "./DarkMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Free icons

const Darkmode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme == "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  return (
    <div className="dark_mode">
      <input
        type="checkbox"
        className="dark_mode_input"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "light"}
      />
      <label htmlFor="darkmode-toggle" className="dark_mode_label">
        <FontAwesomeIcon icon={faSun} className="sun" />
        <FontAwesomeIcon icon={faMoon} className="moon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default Darkmode;
