// src/pages/MembersPages/Announcements/AnnouncementList.js

import React from 'react';
import styles from './AnnouncementList.module.css';
import AnnouncementItem from './AnnouncementItem';

const AnnouncementList = ({ announcements, onReadMore }) => {
  return (
    <div className={styles.list}>
      {announcements.map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          announcement={announcement}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};

export default AnnouncementList;
