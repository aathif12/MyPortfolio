import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import Bookme from "../assets/Bookme.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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
        {/* <div className="portfolio-box">
          <img src={img3} alt="" className="portimg" />
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
          <img src={img4} alt="" className="portimg" />
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
          <img src={img5} alt="" className="portimg" />
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
          <img src={img6} alt="" className="portimg" />
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
        </div> */}
      </div>
    </section>
  );
};
export default Portfolio;
