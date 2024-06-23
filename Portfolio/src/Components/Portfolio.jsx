import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
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
          <img src={img1} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>Each project represents a unique challenge</p>
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
          </div>
        </div>
        <div className="portfolio-box">
          <img src={img2} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences.
            </p>
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
          </div>
        </div>
        <div className="portfolio-box">
          <img src={img3} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences.
            </p>
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
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
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
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
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
          </div>
        </div>
        <div className="portfolio-box">
          // <img src={img6} alt="" className="portimg" />
          <div className="portfolio-layer">
            <h4>Web Design</h4>
            <p>
              Each project represents a unique challenge and an opportunity to
              create innovative, user-friendly web experiences.
            </p>
            <FontAwesomeIcon className="aathi" icon={faUpRightFromSquare} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Portfolio;
