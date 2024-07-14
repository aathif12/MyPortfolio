import Bookme from "../assets/Bookme.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Wolverine from "../assets/Wolverine.png";
const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="heading">
        Latest <span>Projects</span>
      </h2>
      <div className="portfolio-container">
        <div className="portfolio-box">
          <img src={Bookme} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Discover my Bus Booking App project, showcasing a user-friendly
              interface for seamless travel planning.
            </p>
            <a href="https://www.figma.com/proto/ZWHSkdhDXVviJAVhW0c14i/Bus-Booking?page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&t=YpsWt1NquTln6FUD-1">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
        <div className="portfolio-box">
          <img src={Bookme} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>MERN</h4>
            <p>
              Real-time scheduling, seat selection, Responsive UI and efficient
              backend for smooth booking on any device..
            </p>
            <a href="https://github.com/SGopinath89/IT2342024BookMe.git">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
        <div className="portfolio-box">
          <img src={Wolverine} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Portfolio Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences. With a focus on
              intuitive design and seamless functionality.
            </p>
            <a href="https://www.figma.com/proto/KOJyHmCYbd0giMpuxG0yN1/Portfolio?t=mC3DMkwKheO1JDic-1">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
        <div className="portfolio-box">
          <img src={Wolverine} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Portfolio </h4>
            <p>
              This repository hosts my portfolio website showcasing projects
              that highlight innovative, user-friendly web experiences. Focused
              on intuitive design and seamless functionality, it demonstrates my
              skills in crafting effective digital solutions
            </p>
            <a href="">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
        <div className="portfolio-box">
          <img src={""} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences.
            </p>
            <a href="">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
        <div className="portfolio-box">
          <img src={""} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences.
            </p>
            <a href="">
              <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Portfolio;
