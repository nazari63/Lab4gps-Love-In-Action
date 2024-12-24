import React from 'react';
import { useLang } from '../../components/Context/LangContext';
import styles from '../../components/styles/Purpose.module.css';
import SingleColumnAccordion from '../../components/Accordion/SingleColumnAccordion';
import why from '../../assets/images/why.png';

const OurPurposeFrame = () => {
  const { t } = useLang();

  return (
    <div className={styles.ourPurposeFrame}>
      {/* Main Title */}
      <h2 className={styles.mainTitle}>{t('about.purposeTitle')}</h2>

      {/* Purpose Text */}
      <div className={styles.textContainer}>
        <p>{t('about.purposeText.part1')}</p>
        <p>{t('about.purposeText.part2')}</p>
        <p>{t('about.purposeText.part3')}</p>
      </div>

      {/* Image */}
      <img
        className={styles.purposeImage}
        alt="Purpose Illustration"
        src={why}
      />

      {/* Slogan Section */}
      <div className={styles.sloganSection}>
        <h3 className={styles.sloganHeading}>
          {t('about.sloganSection.title')}
        </h3>

        <SingleColumnAccordion
          title={t('about.sloganSection.slogan1.title')}
          content={t('about.sloganSection.slogan1.description')}
          defaultOpen  /* First one open by default */
        />
        <SingleColumnAccordion
          title={t('about.sloganSection.slogan2.title')}
          content={t('about.sloganSection.slogan2.description')}
        />
        <SingleColumnAccordion
          title={t('about.sloganSection.slogan3.title')}
          content={t('about.sloganSection.slogan3.description')}
        />
      </div>
    </div>
  );
};

export default OurPurposeFrame;
