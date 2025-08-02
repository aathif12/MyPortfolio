import { useState } from "react";
import Bookme from "../assets/Bookme.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Wolverine from "../assets/Wolverine.svg";
import { faGithub, faFigma } from "@fortawesome/free-brands-svg-icons";
import fitnest from "../assets/fitnest.svg";
import uniBond from "../assets/uniBond.png";
import logo from "../assets/logo.png";
const projects = [
  {
    id: 1,
    title: "Web Design",
    category: "design",
    img: Bookme,
    desc: "Discover my Bus Booking App project, showcasing a user-friendly interface for seamless travel planning.",
    link: "https://www.figma.com/proto/ZWHSkdhDXVviJAVhW0c14i/Bus-Booking?page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&t=YpsWt1NquTln6FUD-1",
    icon: faFigma,
  },
  {
    id: 2,
    title: "MERN",
    category: "project",
    img: Bookme,
    desc: "Real-time scheduling, seat selection, Responsive UI and efficient backend for smooth booking on any device..",
    link: "https://github.com/SGopinath89/IT2342024BookMe.git",
    icon: faGithub,
  },
  {
    id: 3,
    title: "Portfolio Design",
    category: "design",
    img: Wolverine,
    desc: "Each project represents a unique challenge and an opportunity to create innovative, user-friendly web experiences.",
    link: "https://www.figma.com/proto/KOJyHmCYbd0giMpuxG0yN1/Portfolio?t=mC3DMkwKheO1JDic-1",
    icon: faFigma,
  },
  {
    id: 4,
    title: "Portfolio",
    category: "project",
    img: Wolverine,
    desc: "This repository hosts my portfolio website showcasing projects that highlight innovative, user-friendly web experiences. Focused on intuitive design and seamless functionality",
    link: "https://github.com/aathif12/MyPortfolio.git",
    icon: faGithub,
  },
  {
    id: 5,
    title: "Mobile App Design",
    category: "design",
    img: fitnest,
    desc: "Each project represents a unique challenge and an opportunity to create innovative, user-friendly web experiences.",
    link: "https://www.figma.com/proto/UnretxKRA0AI7ZjRHgCW55/Fitnest---Fitness-App?t=LyARGgwdw9DnnKNi-1",
    icon: faFigma,
  },
  {
    id: 6,
    title: "Mobile Application",
    category: "project",
    img: fitnest,
    desc: "Unibond is a mobile application that connects University of Vavuniya undergraduates and alumni to share jobs, skills, and projects,",
    link: "",
    icon: faGithub,
  },
  {
    id: 7,
    title: "Mobile Design",
    category: "design",
    img: uniBond,
    desc: "Each project represents a unique challenge and an opportunity to create innovative, user-friendly web experiences.",
    link: "https://www.figma.com/design/e7WcPNOHj07GbUcE1DBLCk/UniBond?node-id=0-1&t=1tIFRu7uaNLtOliN-1",
    icon: faFigma,
  },
  {
    id: 8,
    title: "Mobile Application",
    category: "project",
    img: uniBond,
    desc: "Unibond is a mobile application that connects University of Vavuniya undergraduates and alumni to share jobs, skills, and projects.",
    link: "https://github.com/Jellorine/UniBond.git",
    icon: faGithub,
  },
  {
    id: 9,
    title: "E-Commerce Application",
    category: "project",
    img: logo,
    desc: "Crafthaven is an e-commerce platform that connects local artisans with customers, promoting handmade products and sustainable practices.",
    link: "https://github.com/aathif12/crafthaven.git",
    icon: faGithub,
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((item) => item.category === filter);

  return (
    <section className="portfolio">
      <h2 className="heading">
        Latest <span>Projects</span>
      </h2>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "20px",
          paddingBottom: "50px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="filter-buttons"
      >
        <button className="btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn" onClick={() => setFilter("design")}>
          Figma Designs
        </button>
        <button className="btn" onClick={() => setFilter("project")}>
          Github Projects
        </button>
      </div>

      <div className="portfolio-container">
        {filteredProjects.map((item) => (
          <div className="portfolio-box" key={item.id}>
            <img
              src={item.img}
              alt={item.title}
              className={item.title.includes("Mobile") ? "portimg1" : "portimg"}
            />
            <div className="portfolio-layer">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="aathi" icon={item.icon} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
