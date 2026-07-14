import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  return (
    <section className="education" id="education">
      <h2 className="heading">
        My <span>Education</span>
      </h2>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot">
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className="timeline-content">
            <div className="exp-header">
              <h3>University of Jaffna</h3>
              <h4>Bachelor of Applied Science - BASc, Information Technology</h4>
            </div>
            <p className="exp-dates">Sep 2022 - Jun 2026</p>
            <p className="exp-skills" style={{ color: "var(--text-color)", opacity: 0.9 }}>
              <FontAwesomeIcon icon={faGem} className="skill-gem" /> Programming Languages, Databases, Data Structures, Web Development, Algorithms, Software Engineering, Version Control
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
