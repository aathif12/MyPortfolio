import Aboutpng from "../assets/Aathif2.png";
import Aboutpng1 from "../assets/Aathif21.png";
const About = () => {
  return (
    <section className="about">
      <div className="about-img">
        <img src={Aboutpng} className="aboutpng" alt="" />
        <img src={Aboutpng1} className="aboutpng1" alt="" />
      </div>
      <div className="about-content">
        <h2 className="heading">
          About <span>Me</span>
        </h2>
        <h3> Digital Experience Architect </h3>
        <p>
          Greetings! I'm Aathif Ahamed, a dedicated Ui/UX designer and web/app
          developer. I specialize in transforming complex ideas into elegant,
          user-friendly interfaces and developing robust, high-performance web
          and mobile applications. My passion lies in crafting designs that not
          only look stunning but also deliver seamless user experiences.
        </p>
        <a href="#" className="btn">
          Read More
        </a>
      </div>
    </section>
  );
};
export default About;
