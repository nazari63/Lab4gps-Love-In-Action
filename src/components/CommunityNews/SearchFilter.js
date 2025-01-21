// src/components/CommunityNews/SearchFilter.js

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
          placeholder="Search news..."
          className={styles.searchInput}
          aria-label="Search news"
        />
      </div>
      <div className={styles.filterContainer}>
        <FaFilter className={styles.icon} />
        <select className={styles.select} aria-label="Filter by category">
          <option>All Categories</option>
          <option>Research</option>
          <option>Events</option>
          <option>Community</option>
        </select>
      </div>
      <div className={styles.sortContainer}>
        <span className={styles.sortLabel}>Sort by:</span>
        <div className={styles.sortSelect}>
          <FaFilter className={styles.icon} />
          <select className={styles.select} aria-label="Sort news">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Trending</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
