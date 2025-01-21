// src/pages/MembersPages/Announcements/Header.js

import React, { useState } from 'react';
import styles from './Header.module.css';
import Breadcrumbs from './Breadcrumbs';
import Filters from './Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onNewAnnouncement }) => {
    const [categories] = useState(['All Categories', 'Events', 'Updates', 'Community']);
    const [sortOptions] = useState(['Sort by: Latest', 'Sort by: Oldest']);
    const handleCategoryChange = (category) => {
        alert(`Filter by category: ${category}`);
        // Implement filter logic here (e.g., fetch filtered announcements)
      };
    
      const handleSortChange = (sortOption) => {
        alert(`Sort option selected: ${sortOption}`);
        // Implement sort logic here (e.g., sort the announcements array)
      };
  return (
    <div className={styles.header}>
      <Breadcrumbs />
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Announcements</h1>
            <Filters
            categories={categories}
            sortOptions={sortOptions}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            />
        <button className={styles.newAnnouncementButton} onClick={onNewAnnouncement} aria-label="Create a new announcement">
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
          New Announcement
        </button>
      </div>
    </div>
  );
};

export default Header;
