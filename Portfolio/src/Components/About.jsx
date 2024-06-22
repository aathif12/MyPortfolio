import Aboutpng from "../assets/Aathif2.png";

const About = () => {
  return (
    <section className="about">
      <div className="about-img">
        <img src={Aboutpng} alt="" />
      </div>
      <div className="about-content">
        <h2 className="heading">
          About <span>Me</span>
        </h2>
        <h3>Frontend Developer</h3>
        <p>
          Hi, I'm Aathif, a passionate and creative front-end developer
          dedicated to building engaging and intuitive user experiences. With a
          strong background in HTML, CSS, JavaScript, and various front-end
          frameworks, I specialize in transforming innovative ideas into
          beautiful, responsive, and functional websites and applications.
        </p>
        <a href="#" className="btn">
          Read More
        </a>
      </div>
    </section>
  );
};
export default About;
