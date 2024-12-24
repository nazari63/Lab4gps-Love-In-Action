import React from 'react';
import styles from './WhoWeServeSection.module.css';

const WhoWeServeSection = () => {
  return (
    <section className={styles.whoWeServeSection}>
      <h2 className={styles.sectionHeading}>Who We Serve</h2>

      {/* 1. Global Community */}
      <div className={styles.communityContainer}>
        <h3 className={styles.subTitle}>Global Community</h3>
        <div className={styles.communityContent}>
          <img
            className={styles.communityImage}
            src="Images.png"
            alt="Global Community"
          />
          <p className={styles.description}>
            Lab4GPS partners with GPS professionals worldwide to address global
            challenges effectively. This diverse network brings together
            expertise and innovation, creating sustainable solutions across
            regions. By sharing knowledge and resources, the GPS network fosters
            collaboration and solidarity, amplifying its collective impact.
          </p>
        </div>
      </div>

      {/* 2. Individual Solutionists */}
      <div className={styles.individualsContainer}>
        <h3 className={styles.subTitle}>Individual Solutionists</h3>
        <div className={styles.individualsContent}>
          {/* Left Column: Descriptions */}
          <div className={styles.individualsText}>
            <div>
              <h4 className={styles.miniHeading}>GPS Startups</h4>
              <p className={styles.description}>
                Lab4GPS partners with GPS professionals worldwide to address
                global challenges effectively. This diverse network brings
                together expertise and innovation, creating sustainable
                solutions across regions. By sharing knowledge and resources,
                the GPS network fosters collaboration and solidarity, amplifying
                its collective impact.
              </p>
            </div>

            <div>
              <h4 className={styles.miniHeading}>Individuals</h4>
              <p className={styles.description}>
                Lab4GPS partners with GPS professionals worldwide to address
                global challenges effectively. This diverse network brings
                together expertise and innovation, creating sustainable
                solutions across regions. By sharing knowledge and resources,
                the GPS network fosters collaboration and solidarity, amplifying
                its collective impact.
              </p>
            </div>
          </div>

          {/* Right Column: Overlayed Image */}
          <div className={styles.individualsImageWrapper}>
            <img
              className={styles.decorImage}
              src="TilesDecorations.png"
              alt="Decorations"
            />
            <div className={styles.overlayBox}>
              <b className={styles.overlayText}>Image</b>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Stakeholders and Investors */}
      <div className={styles.stakeholdersContainer}>
        <div className={styles.stakeholdersImageWrapper}>
          <img
            className={styles.decorImageTwo}
            src="TilesDecorations.png"
            alt="Decorations"
          />
          <div className={styles.overlayBoxTwo}>
            <b className={styles.overlayText}>Image</b>
          </div>
        </div>
        <div className={styles.stakeholdersText}>
          <h3 className={styles.subTitle}>Stakeholders and Investors</h3>
          <p className={styles.description}>
            We serve stakeholders and investors who resonate with our vision
            and goals and wish to invest their time and resources with love.
            They not only provide financial support but also strategic advice
            and networks to ensure successful global problem-solving.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
