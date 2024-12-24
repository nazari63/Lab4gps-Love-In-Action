import React from 'react';
import { useLang } from '../../components/Context/LangContext';
import styles from '../../components/styles/WhoWeAre.module.css';
import TeamMember from '../../components/About/WhoWeAre/TeamMember';
import WhoWeServeSection from '../../components/About/WhoWeAre/WhoWeServeSection';

import whoWeAreImage from '../../assets/images/who1.jpg'; // or your actual hero image

// Icons from react-icons
import {
  FaHandshake,
  FaRocket,
  FaClock,
  FaUserShield,
  FaCog,
  FaWrench,
} from 'react-icons/fa';

const WhoWeAre = () => {
  const { t } = useLang();

  // Data for Team Members
  const teamMembers = [
    {
      title: t('about.team.iwlPartners'),
      iconSrc: <FaHandshake />,
      description: t('about.team.iwlPartnersDescription'),
    },
    {
      title: t('about.team.gpsStartups'),
      iconSrc: <FaRocket />,
      description: t('about.team.gpsStartupsDescription'),
    },
    {
      title: t('about.team.gpsPD'),
      iconSrc: <FaClock />,
      description: t('about.team.gpsPDDescription'),
    },
    {
      title: t('about.team.gpsSpecialist'),
      iconSrc: <FaUserShield />,
      description: t('about.team.gpsSpecialistDescription'),
    },
    {
      title: t('about.team.operationTeam'),
      iconSrc: <FaCog />,
      description: t('about.team.operationTeamDescription'),
    },
    {
      title: t('about.team.sharedServiceCenter'),
      iconSrc: <FaWrench />,
      description: t('about.team.sharedServiceCenterDescription'),
    },
  ];

  return (
    <div className={styles.whoWeAreWrapper}>
      {/* TOP SECTION (Intro) */}
      <section className={styles.topSection}>
        <div className={styles.imageContainer}>
          <img
            src={whoWeAreImage}
            alt="Who We Are"
            className={styles.introImage}
          />
        </div>
        <div className={styles.introContent}>
          <h2 className={styles.heading}>{t('about.whoWeAre')}</h2>
          <p className={styles.introText}>{t('about.whoWeAreDescription.part1')}</p>
          <p className={styles.introText}>{t('about.whoWeAreDescription.part2')}</p>
          <button className={styles.joinButton}>{t('about.joinUs')}</button>
        </div>
      </section>

      {/* OUR TEAM SECTION */}
      <section className={styles.teamSection}>
        <h3 className={styles.sectionTitle}>{t('about.ourTeam')}</h3>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              title={member.title}
              iconSrc={member.iconSrc}
              description={member.description}
            />
          ))}
        </div>
      </section>

      {/* WHO WE SERVE SECTION */}
      <WhoWeServeSection />
    </div>
  );
};

export default WhoWeAre;
