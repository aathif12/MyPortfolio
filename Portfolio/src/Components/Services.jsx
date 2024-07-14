import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
const Services = () => {
  return (
    <section className="services">
      <h2 className="heading">
        My <span>Services</span>
      </h2>
      <div className="service-container">
        <div className="services-box">
          <FontAwesomeIcon className="Servciesicon" icon={faCode} />
          <h3>Web Development</h3>
          <p>
            Building responsive and secure websites with engaging front-end
            interfaces (HTML, CSS, JavaScript) and robust back-end solutions
            (Node.js, Python, PHP), including CMS integration and e-commerce
            solutions.
          </p>
          <a href="#" className="btn">
            Read more
          </a>
        </div>
        <div className="services-box">
          <FontAwesomeIcon className="Servciesicon" icon={faPalette} />
          <h3>UI/UX Design</h3>
          <p>
            Crafting intuitive, visually appealing digital experiences that
            exceed user expectations through extensive research, meticulous
            wireframing, and iterative prototyping, aiming to create
            user-centric designs that delight.
          </p>
          <a href="#" className="btn">
            Read more
          </a>
        </div>
        <div className="services-box">
          <FontAwesomeIcon className="Servciesicon" icon={faAndroid} />
          <h3>App Devlelopment</h3>
          <p>
            Developing native and hybrid mobile applications with a focus on
            seamless user experiences, leveraging technologies like React
            Native, ensuring functionality and performance from concept to
            deployment
          </p>
          <a href="#" className="btn">
            Read more
          </a>
        </div>
      </div>
    </section>
  );
};
export default Services;
