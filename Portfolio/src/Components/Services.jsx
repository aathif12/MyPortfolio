import Code from "../assets/Code.svg";
import palette from "../assets/palette.svg";
import android from "../assets/android.svg";
const Services = () => {
  return (
    <section className="services">
      <h2 className="heading">
        My <span>Services</span>
      </h2>
      <div className="service-container">
        <div className="services-box">
          <img src={Code} alt="" className="code" />
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
          <img src={palette} alt="" className="code" />
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
          <img src={android} alt="" className="code" />
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
