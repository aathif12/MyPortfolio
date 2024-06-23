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
        <h3>Hi, Myself</h3>
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
          "Transforming Ideas into Stunning Digital Realities – Aathif, Expert
          Front-End Developer Crafting Seamless User Experiences"
        </p>

        <div className="social-media">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="#">
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
