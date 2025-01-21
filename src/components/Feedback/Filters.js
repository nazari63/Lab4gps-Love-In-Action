// src/components/Feedback/Filters.js

import React from 'react';
import styles from './Filters.module.css';
import { FaSort, FaFilter } from 'react-icons/fa';

const Filters = ({
  sortOption,
  onSortChange,
  filterCategory,
  onFilterCategoryChange,
  filterStatus,
  onFilterStatusChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <FaSort className={styles.icon} />
        <label htmlFor="sort" className={styles.label}>
          Sort By:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.select}
        >
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <FaFilter className={styles.icon} />
        <label htmlFor="category" className={styles.label}>
          Category:
        </label>
        <select
          id="category"
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
          className={styles.select}
        >
          <option value="All Categories">All Categories</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Enhancement">Enhancement</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <FaFilter className={styles.icon} />
        <label htmlFor="status" className={styles.label}>
          Status:
        </label>
        <select
          id="status"
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          className={styles.select}
        >
          <option value="All Status">All Status</option>
          <option value="Pending Review">Pending Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Implemented">Implemented</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
