// src/pages/MembersPages/Announcements/Filters.js

import React from 'react';
import styles from './Filters.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ categories, sortOptions, onCategoryChange, onSortChange }) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <select className={styles.select} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Filter by category">
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
      </div>
      <div className={styles.filter}>
        <select className={styles.select} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort announcements">
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
      </div>
    </div>
  );
};

export default Filters;
