import React from 'react';
import { Icon } from '@iconify/react';
// For example, if you want to replace 'tabler:heart-filled.svg' with Iconify:
// import { FaHeart, FaCrown, FaBrain } from 'react-icons/fa'; // if using react-icons
// Then you can use <FaHeart /> etc.

import styles from '../../components/styles/CoreValues.module.css';

const CoreValues = () => {
  return (
    <section className={styles.coreValuesSection}>
      {/* Main Headings */}
      <div className={styles.headingsContainer}>
        <h1 className={styles.title}>Core Values</h1>
        <h2 className={styles.subtitle}>Love, Courage, and Wisdom</h2>
      </div>

      {/* Intro Paragraph */}
      <p className={styles.introText}>
        At Lab4GPS, our Core Values — Love, Courage, and Wisdom — form the
        framework of our purpose. These values guide us in nurturing
        innovative enterprises, transforming technologies into thriving
        solutions, and fostering lasting positive change. Through Love,
        Courage, and Wisdom, Lab4GPS is committed to empowering innovators
        to address global challenges and contribute to a better world.
      </p>

      {/* Love, Courage, Wisdom Cards */}
      <div className={styles.valuesCards}>
        <div className={styles.card}>
          {/* Replace with your preferred icon library */}
          <Icon icon="tabler:heart-filled" className={styles.icon} />
          <h3 className={styles.cardTitle}>Love</h3>
          <p className={styles.cardText}>
            Love is true concern and compassion. It means solving other
            people&apos;s problems.
          </p>
        </div>

        <div className={styles.card}>
          <Icon icon="solar:crown-bold-duotone" className={styles.icon} />
          <h3 className={styles.cardTitle}>Courage</h3>
          <p className={styles.cardText}>
            Courage is the ability to endure uncertainty and risk. It
            signifies a commitment to pioneering new paths.
          </p>
        </div>

        <div className={styles.card}>
          <Icon icon="lucide:brain" className={styles.icon} />
          <h3 className={styles.cardTitle}>Wisdom</h3>
          <p className={styles.cardText}>
            Wisdom is having insight and understanding of complex problems,
            and making balanced decisions.
          </p>
        </div>
      </div>

      {/* Scripture Verses */}
      <h2 className={styles.versesTitle}>Scripture Verses</h2>

      <div className={styles.versesContainer}>
        <div className={styles.verseCard}>
          <h3 className={styles.verseCardTitle}>John 13:34</h3>
          <p className={styles.verseText}>
            A new command I give you: Love one another. As I have loved you,
            so you must love one another.
          </p>
        </div>

        <div className={styles.verseCard}>
          <h3 className={styles.verseCardTitle}>Romans 8:28</h3>
          <p className={styles.verseText}>
            And we know that in all things God works for the good of those
            who love him, who have been called according to his purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
