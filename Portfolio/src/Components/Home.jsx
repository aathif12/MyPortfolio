import React from "react";

import aathif from "../assets/Aathif.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
const Home = () => {
  return (
    <section className="home" id="home">
      <div className="Home-content">
        <h3>Hi, Myself</h3>
        <h1>Aathif Ahamed</h1>
        <h3>
          And I'm a <span> Frontend Developer</span>
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
        <img className="homImg" src={aathif} />
      </div>
    </section>
  );
};
export default Home;
