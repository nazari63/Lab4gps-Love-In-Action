import React from 'react';
import styles from '../../components/styles/Vision.module.css';

const VisionWhere = () => {
  return (
    <section className={styles.visionSection}>
      {/* Main Heading */}
      <div className={styles.headerContainer}>
        <h1 className={styles.ourVision}>Our Vision</h1>
        <h2 className={styles.pathTitle}>
          Pioneering the Path to a Better World <br />
          through Education, Innovation, and Collaboration
        </h2>
      </div>

      {/* Intro paragraph */}
      <p className={styles.introText}>
        Lab4GPS envisions a future where education, innovation, and collaboration converge
        to solve the world&apos;s problems. We aim to establish an online university and
        a platform that connects those with problems to those who can solve them,
        creating a comprehensive problem-solving ecosystem that supports global
        problem-solving.
      </p>

      {/* Univ 4.0 */}
      <div className={styles.sectionWrapper}>
        <h3 className={styles.subHeading}>Univ 4.0</h3>
        <div className={styles.flexContainer}>
          <div className={styles.imageBox}>
            {/* Replace this placeholder with an actual <img> tag or icon */}
            <div className={styles.imagePlaceholder}>Image</div>
          </div>
          <div className={styles.textBox}>
            <p>
              Univ 4.0 expands the GPS program online, making it accessible to students
              worldwide. This platform offers the GPS curriculum, equipping students with
              the skills and knowledge necessary to address global issues. By providing a
              robust educational foundation, Univ 4.0 empowers the next generation of
              global leaders to develop innovative solutions and drive sustainable change.
            </p>
          </div>
        </div>
      </div>

      {/* SNS 4.0 */}
      <div className={styles.sectionWrapper}>
        <h3 className={styles.subHeading}>SNS 4.0</h3>
        <div className={styles.flexContainer}>
          <div className={styles.imageBox}>
            {/* Replace this placeholder with an actual <img> tag or icon */}
            <div className={styles.imagePlaceholder}>Image</div>
          </div>
          <div className={styles.textBox}>
            <p>
              SNS 4.0 is an online hub where people with problems can meet people who can
              solve them. The platform promotes collaboration by sharing ideas and
              solutions to solve global problems and promoting collaborative projects.
            </p>
            <p>
              Each stage is gamified, providing clear goals and rewards, and participants
              gradually gain knowledge and skills by solving real-world problems. You can
              acquire and challenge yourself with increasingly complex problems.
            </p>
          </div>
        </div>
      </div>

      {/* Further Description */}
      <div className={styles.furtherDescription}>
        <p>
          Our vision includes training the next generation of global leaders essential for
          addressing these issues and establishing companies focused on problem-solving.
          We aspire to play a leading role in creating a better world with global
          consumers. Through our programs and support, the GPS we nurture will solve
          global problems and generate Joy, Money, and Love, positively impacting the
          world. They will lead research and innovation to address various global issues,
          collaborating with the global community to seek sustainable solutions. We will
          continuously support them in contributing to a better future by solving diverse
          world problems.
        </p>
      </div>
    </section>
  );
};

export default VisionWhere;
