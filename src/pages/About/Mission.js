import React from 'react';
// If you use TypeScript, you can keep the FunctionComponent type, else remove
import { Icon } from '@iconify/react'; 
// ^ or any icons from react-icons, e.g. { MdHammerWrench, MdSchool } from 'react-icons/md';
import styles from '../../components/styles/Mission.module.css';
import trainingImage from '../../assets/images/what6.jpg';
import gridImage1 from '../../assets/images/what1.jpg';
import gridImage2 from '../../assets/images/what2.jpg';
import gridImage3 from '../../assets/images/what3.jpg';
import gridImage4 from '../../assets/images/what4.jpg';

const OurMission = () => {
  return (
    <section className={styles.ourMissionSection}>
      <div className={styles.missionHeadingContainer}>
        <h1 className={styles.ourMissionTitle}>Our Mission</h1>
        <h2 className={styles.empoweringTitle}>
          Empowering Gps Through Education, Research, and Practice
        </h2>
      </div>

      <div className={styles.missionMilestone}>
        {/* First Milestone: "Development" */}
        <div className={styles.milestoneWrapper}>
          {/* Left icon + line */}
          <div className={styles.milestoneIndicator}>
            <div className={styles.iconBox}>
              {/* Example Iconify icon, or replace with React Icons */}
              <Icon icon="mdi:hammer-wrench" className={styles.icon} />
            </div>
            <div className={styles.verticalLine} />
          </div>

          {/* Milestone Content */}
          <div className={styles.milestoneContent}>
            <h3 className={styles.milestoneTitle}>Development</h3>
            <p className={styles.milestoneDescription}>
              Beyond theoretical education, we emphasize real-world problem-solving 
              experiences. Students tackle real-world global problems and apply 
              theories learned through hands-on projects.
            </p>
            <p className={styles.milestoneDescription}>
              By working with people from diverse backgrounds, students understand 
              their role as members of a global community and broaden their 
              understanding of international issues.
            </p>

            <div className={styles.detailList}>
              <ul>
                <li>
                  The GPS program combines Christian values with entrepreneurial 
                  spirit to train the next generation of global leaders (GPS) 
                  to address global issues.
                </li>
              </ul>
            </div>

            {/* Subdescriptions */}
            <div className={styles.subDescriptions}>
              <div className={styles.descriptionCard}>
                <div className={styles.iconRepresent}>
                  {/* Another icon or image */}
                  <Icon icon="mdi:book" color="#fff" />
                </div>
                <div className={styles.descriptionText}>
                  <p>
                    Students from different academic disciplines collaborate to 
                    solve problems. We combine knowledge and skills from various 
                    fields to create more effective solutions.
                  </p>
                </div>
              </div>

              <div className={styles.descriptionCard}>
                <div className={styles.iconRepresent}>
                  <Icon icon="mdi:heart" color="#fff" />
                </div>
                <div className={styles.descriptionText}>
                  <p>
                    Based on the principle that "solving other people's problems 
                    is an act of love," solve complex global problems involving 
                    cultural, religious, political, and economic factors.
                  </p>
                </div>
              </div>
            </div>

            {/* Image grid (e.g. "Image+Shadow.png") */}
            <div className={styles.imageGrid}>
              {/* Just an example of multiple images. Keep as many as you need. */}
              <img
                src={gridImage1}
                alt="Sample 1"
                className={styles.gridImage}
              />
              <img
                src={gridImage2}
                alt="Sample 2"
                className={styles.gridImage}
              />
              <img
                src={gridImage3}
                alt="Sample 3"
                className={styles.gridImage}
              />
              <img
                src={gridImage4}
                alt="Sample 3"
                className={styles.gridImage}
              />
            </div>
          </div>
        </div>

        {/* Second Milestone: "Training" */}
        <div className={styles.milestoneWrapper}>
          <div className={styles.milestoneIndicator}>
            <div className={styles.iconBox}>
              {/* e.g., training icon */}
              <Icon icon="mdi:school-outline" className={styles.icon} />
            </div>
            <div className={styles.verticalLineShort} />
          </div>

          <div className={styles.trainingContent}>
            {/* Left image */}
            <img
              src={trainingImage}
              alt="Training sample"
              className={styles.trainingImage}
            />

            {/* Text content */}
            <div className={styles.trainingTextBox}>
              <h3 className={styles.trainingTitle}>
                Training GPS Through the GPS Program
              </h3>
              <p>
                Lab4GPS trains the next generation of Global Problem Solvers (GPS) 
                through educational programs, helping students discover their 
                identity and build a roadmap for success.
              </p>
              <p>
                Emphasizing “learning through practice,” students apply their 
                knowledge to real-world problems, preparing them to be trusted 
                leaders in solving global challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Third Milestone: "Support GPS To Find Purpose..." */}
        <div className={styles.milestoneWrapper}>
          <div className={styles.milestoneIndicator}>
            <div className={styles.iconBox}>
              <Icon icon="pepicons-pencil:handshake-circle-filled" className={styles.icon} />
            </div>
            <div className={styles.verticalLineShort} />
          </div>

          <div className={styles.supportContent}>
            <h3 className={styles.milestoneTitle}>Support GPS To Find Purpose-driven Enterprise</h3>
            <p>
              Lab4GPS acts as an incubator to support the creation of 
              purpose-driven companies that aim to solve global problems. We 
              emphasize innovative approaches such as global value chain 
              innovation, systems thinking, and design thinking to help GPS 
              create products and services that resonate with consumers — 
              helping you create joy, money, and love through problem solving.
            </p>
          </div>
        </div>

        {/* Fourth Milestone: "Current State" (Startups) */}
        <div className={styles.milestoneWrapper}>
          <div className={styles.milestoneIndicator}>
            <div className={styles.iconBox}>
              <Icon icon="pepicons-pop:trophy-circle-filled" className={styles.icon} />
            </div>
            <div className={styles.verticalLineShort} />
          </div>

          <div className={styles.currentState}>
            <h3 className={styles.milestoneTitle}>Current State</h3>
            <div className={styles.projects}>
              {/* Project #1 */}
              <div className={styles.projectCard}>
                <h4>Chakancha</h4>
                <p>
                  Chakancha is the first startup created by Lab4GPS, aiming to 
                  improve the working conditions of Kenyan tea pickers and 
                  respect their living standards...
                </p>
              </div>

              {/* Project #2 */}
              <div className={styles.projectCard}>
                <h4>Momma</h4>
                <p>
                  Mamma is a startup team that helps foreigners easily learn 
                  about the Korean language, culture, and work environment...
                </p>
              </div>

              {/* Project #3 */}
              <div className={styles.projectCard}>
                <h4>WAH (WOW)</h4>
                <p>
                  The WAH team helps people who are wandering without finding 
                  their purpose in life to live a purpose-driven life...
                </p>
              </div>

              {/* Project #4 */}
              <div className={styles.projectCard}>
                <h4>Chackan Cashmere</h4>
                <p>
                  Chakan Cashmere aims to improve working conditions in 
                  Mongolia and pursue sustainable practices...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
