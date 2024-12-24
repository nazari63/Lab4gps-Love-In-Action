// src/pages/About/SlogaSection.jsx
import React from 'react';
import { useLang } from '../../components/Context/LangContext';
import styles from './SlogaSection.module.css';
import Accordion from '../Accordion';

const SlogaSection = () => {
  const { t } = useLang();

  const slogans = [
    {
      title: t("about.sloganSection.slogan1.title"),
      content: t("about.sloganSection.slogan1.description")
    },
    {
      title: t("about.sloganSection.slogan2.title"),
      content: t("about.sloganSection.slogan2.description")
    },
    {
      title: t("about.sloganSection.slogan3.title"),
      content: t("about.sloganSection.slogan3.description")
    }
  ];

  return (
    <div className={styles.slogasection}>
      <h3 className={styles.slogan}>{t("about.sloganSection.title")}</h3>
      {slogans.map((slogan, index) => (
        <Accordion key={index} title={slogan.title} content={slogan.content} />
      ))}
    </div>
  );
};

export default SlogaSection;
