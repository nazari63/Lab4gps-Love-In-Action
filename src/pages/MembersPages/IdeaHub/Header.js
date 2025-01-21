import React from 'react';
import styles from './Header.module.css';
import { FaSort, FaFilter, FaUpload } from 'react-icons/fa';

const Header = ({ onUpload, onSortChange, onFilterChange, sortOption, filterOption }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Popular Ideas</h2>
      <div className={styles.controls}>
        <div className={styles.control}>
          <FaSort className={styles.icon} />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className={styles.select}
            aria-label="Sort Ideas"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
        <div className={styles.control}>
          <FaFilter className={styles.icon} />
          <select
            value={filterOption}
            onChange={(e) => onFilterChange(e.target.value)}
            className={styles.select}
            aria-label="Filter Ideas"
          >
            <option value="">All</option>
            <option value="In Progress">In Progress</option>
            <option value="Proposed">Proposed</option>
            <option value="Implemented">Implemented</option>
          </select>
        </div>
        <button className={styles.uploadButton} onClick={onUpload}>
          <FaUpload className={styles.uploadIcon} /> Upload Idea
        </button>
      </div>
    </header>
  );
};

export default Header;
