// src/pages/MembersPages/Resources/Filters.js

import React, { useState } from 'react';
import styles from './Filters.module.css';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

const Filters = ({ filters, setFilters }) => {
  const [openFilter, setOpenFilter] = useState(null);

  const categories = [
    'Research',
    'Methodology',
    'Guide',
    'Template',
    'Presentation',
    'Data',
    'Survey',
    'Qualitative',
  ];

  const fileTypes = ['PDF', 'Word', 'PPTX', 'MP4'];
  const sortOptions = ['Latest', 'Oldest'];
  const statuses = ['Approved', 'Pending'];

  const handleFilterClick = (filterType) => {
    if (openFilter === filterType) {
      setOpenFilter(null);
    } else {
      setOpenFilter(filterType);
    }
  };

  const handleSelect = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setOpenFilter(null);
  };

  const handleClearFilter = (filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: '',
    }));
  };

  return (
    <div className={styles.filters}>
      {/* All Categories Filter */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterLabel}
          onClick={() => handleFilterClick('category')}
        >
          {filters.category || 'All Categories'}{' '}
          <FaChevronDown className={styles.icon} />
        </div>
        {openFilter === 'category' && (
          <div className={styles.dropdown}>
            {categories.map((category) => (
              <div
                key={category}
                className={styles.dropdownItem}
                onClick={() => handleSelect('category', category)}
              >
                {category}
              </div>
            ))}
            {filters.category && (
              <div
                className={styles.clearFilter}
                onClick={() => handleClearFilter('category')}
              >
                <FaTimes /> Clear
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Type Filter */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterLabel}
          onClick={() => handleFilterClick('fileType')}
        >
          {filters.fileType || 'File Type'} <FaChevronDown className={styles.icon} />
        </div>
        {openFilter === 'fileType' && (
          <div className={styles.dropdown}>
            {fileTypes.map((type) => (
              <div
                key={type}
                className={styles.dropdownItem}
                onClick={() => handleSelect('fileType', type)}
              >
                {type}
              </div>
            ))}
            {filters.fileType && (
              <div
                className={styles.clearFilter}
                onClick={() => handleClearFilter('fileType')}
              >
                <FaTimes /> Clear
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sort By Filter */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterLabel}
          onClick={() => handleFilterClick('sortBy')}
        >
          {filters.sortBy || 'Sort By'} <FaChevronDown className={styles.icon} />
        </div>
        {openFilter === 'sortBy' && (
          <div className={styles.dropdown}>
            {sortOptions.map((option) => (
              <div
                key={option}
                className={styles.dropdownItem}
                onClick={() => handleSelect('sortBy', option)}
              >
                {option}
              </div>
            ))}
            {filters.sortBy && (
              <div
                className={styles.clearFilter}
                onClick={() => handleClearFilter('sortBy')}
              >
                <FaTimes /> Clear
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className={styles.filterGroup}>
        <div
          className={styles.filterLabel}
          onClick={() => handleFilterClick('status')}
        >
          {filters.status || 'Status'} <FaChevronDown className={styles.icon} />
        </div>
        {openFilter === 'status' && (
          <div className={styles.dropdown}>
            {statuses.map((status) => (
              <div
                key={status}
                className={styles.dropdownItem}
                onClick={() => handleSelect('status', status)}
              >
                {status}
              </div>
            ))}
            {filters.status && (
              <div
                className={styles.clearFilter}
                onClick={() => handleClearFilter('status')}
              >
                <FaTimes /> Clear
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
