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
            Web development is the art and science of building websites and web
            applications that are not only visually appealing but also highly
            functional and user-friendly.
          </p>
          <a href="#" className="btn">
            Read more
          </a>
        </div>
        <div className="services-box">
          <FontAwesomeIcon className="Servciesicon" icon={faPalette} />
          <h3>UI/UX Design</h3>
          <p>
            Web development is the art and science of building websites and web
            applications that are not only visually appealing but also highly
            functional and user-friendly.
          </p>
          <a href="#" className="btn">
            Read more
          </a>
        </div>
        <div className="services-box">
          <FontAwesomeIcon className="Servciesicon" icon={faAndroid} />
          <h3>App Devlelopment</h3>
          <p>
            Web development is the art and science of building websites and web
            applications that are not only visually appealing but also highly
            functional and user-friendly.
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
