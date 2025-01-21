// src/components/Decision/SearchFilter.js

import React from 'react';
import styles from './SearchFilter.module.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchFilter = () => {
  return (
    <section className={styles.searchFilter}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search decisions..."
          className={styles.searchInput}
          aria-label="Search decisions"
        />
      </div>
      <div className={styles.filterContainer}>
        <FaFilter className={styles.icon} />
        <select className={styles.select} aria-label="Filter by category">
          <option>All Categories</option>
          <option>Finance</option>
          <option>Operations</option>
          <option>Human Resources</option>
        </select>
      </div>
      <button className={styles.newDecisionButton}>
        New Decision
      </button>
    </section>
  );
};

export default SearchFilter;
