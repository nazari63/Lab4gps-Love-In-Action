// src/components/Idea/Sidebar.js

import React from 'react';
import styles from './Sidebar.module.css';
import { FaChevronDown } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.listText}>All Ideas</span>
            <FaChevronDown className={styles.icon} />
          </li>
          <li className={styles.listItem}>
            <span className={styles.listText}>Popular</span>
            <FaChevronDown className={styles.icon} />
          </li>
          <li className={styles.listItem}>
            <span className={styles.listText}>Recent</span>
            <FaChevronDown className={styles.icon} />
          </li>
          <li className={styles.listItem}>
            <span className={styles.listText}>Implemented</span>
            <FaChevronDown className={styles.icon} />
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Topics</h3>
        <div className={styles.tags}>
          <span className={styles.tag}>#Research</span>
          <span className={styles.tag}>#Technology</span>
          <span className={styles.tag}>#Education</span>
          <span className={styles.tag}>#Community</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
