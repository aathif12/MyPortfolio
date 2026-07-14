import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faBriefcase, faBuilding } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <h2 className="heading">
        My <span>Experience</span>
      </h2>

      <div className="timeline">
        {/* Powersoft Pvt Ltd */}
        <div className="timeline-item">
          <div className="timeline-dot">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div className="timeline-content">
            <div className="exp-header">
              <h3>Software Engineer Intern</h3>
              <h4>Powersoft Pvt Ltd · Full-time</h4>
            </div>
            <p className="exp-dates">Mar 2026 - Present · 5 mos</p>
            <p className="exp-location">Sri Lanka · On-site</p>
            <p className="exp-skills" style={{ color: "var(--text-color)", opacity: 0.9 }}>
              <FontAwesomeIcon icon={faGem} className="skill-gem" /> Full Stack Development, React, Node.js, NextJS, Tailwind CSS
            </p>
          </div>
        </div>

        {/* Taurgo Group */}
        <div className="timeline-item">
          <div className="timeline-dot">
            <FontAwesomeIcon icon={faBriefcase} />
          </div>
          <div className="timeline-content">
            <div className="exp-header">
              <h3>Taurgo</h3>
              <h4>Freelance · 1 yr</h4>
            </div>
            <p className="exp-location">Remote</p>

            <div className="sub-roles">
              {/* Graphic Designer Role */}
              <div className="sub-role">
                <div className="sub-timeline-dot"></div>
                <div className="sub-role-content">
                  <h5>Freelance Graphic Designer</h5>
                  <p className="exp-dates">Aug 2025 - Present · 1 yr</p>
                  <p className="exp-location">Greater London, England, United Kingdom</p>
                  <p className="exp-skills" style={{ color: "var(--text-color)", opacity: 0.9 }}>
                    <FontAwesomeIcon icon={faGem} className="skill-gem" /> Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Figma
                  </p>
                </div>
              </div>

              {/* Software Engineer Role */}
              <div className="sub-role">
                <div className="sub-timeline-dot"></div>
                <div className="sub-role-content">
                  <h5>Software Engineer Intern</h5>
                  <p className="exp-dates">Aug 2025 - Jan 2026 · 6 mos</p>
                  <p className="exp-location">United Kingdom</p>
                  <p className="exp-skills" style={{ color: "var(--text-color)", opacity: 0.9 }}>
                    <FontAwesomeIcon icon={faGem} className="skill-gem" /> Site Development, Website Building, React, Tailwind CSS, JavaScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
