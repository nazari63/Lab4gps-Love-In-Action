// src/pages/MembersPages/Resources/Breadcrumbs.js

import React from 'react';
import styles from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/members" className={styles.link}>
        Members
      </Link>
      <span className={styles.separator}>/</span>
      <span className={styles.current}>Resources</span>
    </nav>
  );
};

export default Breadcrumbs;
