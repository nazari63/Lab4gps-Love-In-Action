// src/components/Decision/NavigationBar.js

import React from 'react';
import styles from './NavigationBar.module.css';
import { FaHome, FaUsers, FaBalanceScale } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <nav className={styles.navbar} aria-label="Main Navigation">
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>
            <FaHome className={styles.icon} />
            Home
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/members" className={styles.navLink}>
            <FaUsers className={styles.icon} />
            Members
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/decisions" className={`${styles.navLink} ${styles.active}`}>
            <FaBalanceScale className={styles.icon} />
            Decisions
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
