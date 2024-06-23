import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>Copyright &copy; 2024 AathifAhamed | All Rights Reserved. </p>
      </div>
      <div className="footer-iconTop">
        <a href="#">
          <FontAwesomeIcon icon={faAngleUp} />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
