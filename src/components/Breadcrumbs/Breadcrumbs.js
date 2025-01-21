import React from 'react';
import styles from './Breadcrumbs.module.css';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = () => {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbList}>
        <li>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        </li>
        <li>
          <FaChevronRight className={styles.icon} />
        </li>
        <li>
          <Link to="/members" className={styles.breadcrumbLink}>Members</Link>
        </li>
        <li>
          <FaChevronRight className={styles.icon} />
        </li>
        <li aria-current="page" className={styles.current}>
          Idea Hub
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
