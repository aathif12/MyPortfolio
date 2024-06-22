import React from "react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import Linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import aathif from "../assets/Aathif.png";
const Home = () => {
  return (
    <section className="home">
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
            <img src={facebook} className="logoFacebook" />
          </a>
          <a href="#">
            <img src={instagram} className="logoInstagram" />
          </a>
          <a href="#">
            <img src={Linkedin} className="logoLinkedin" />
          </a>
          <a href="#">
            <img src={github} className="logoGithub" />
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
