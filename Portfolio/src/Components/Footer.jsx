import AngleUp from "../assets/angleup.svg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>Copyright &copy; 2024 AathifAhamed | All Rights Reserved.</p>
      </div>
      <div className="footer-iconTop">
        <a href="#">
          <img className="Angle" src={AngleUp}></img>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
