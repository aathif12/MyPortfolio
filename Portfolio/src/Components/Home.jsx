import React from "react";
import { ReactTyped } from "react-typed";
import aathif from "../assets/Aathif.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="Home-content">
        <h3>Hi, I'm</h3>
        <h1>Aathif Ahamed</h1>
        <h3>
          And I'm a{" "}
          <span>
            <ReactTyped
              strings={["Web Developer", "UI/UX Designer", "App Developer"]}
              typeSpeed={100}
              backSpeed={50}
              backDelay={1000}
              loop
            />
          </span>
        </h3>
        <p>
          "Transforming Ideas into Stunning Digital Realities – Aathif Ahamed,
          Expert in Web Development, Ui/UX Design, and App Development. Crafting
          Dynamic Websites, Intuitive Interfaces, and Engaging Mobile
          Applications for Seamless User Experiences."
        </p>

        <div className="social-media">
          <a href="https://www.facebook.com/profile.php?id=100011437363275">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2F_aathi_11_%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR1JEHNZNXYrJxIfzbfV5DukJmSydBfOfCuyWz3q-US6THjKN6rjNE88Fko_aem_reaYnUXSEQHJ0op2y7GvWQ&h=AT0YMfyuEgEEHMBxMUisnsbghq2XcuFttVirFkb8umWJfrj8J8SA2NlzotJtLADT8UHwRmvovClNLAD4J20t1rLAyyWyZh7iAaXygBwQqcEiAlcq2ft65UrcOkH-eh0OObU2">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/in/aathif-ahamed-71387019a">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="https://github.com/aathif12">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <a href="#" className="btn">
          Download CV
        </a>
      </div>
      <div className="home-img">
        <img className="homImg" src={aathif} alt="Aathif Ahamed" />
      </div>
    </section>
  );
};

export default Home;
