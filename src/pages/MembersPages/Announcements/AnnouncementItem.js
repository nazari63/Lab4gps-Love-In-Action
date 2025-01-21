// src/pages/MembersPages/Announcements/AnnouncementItem.js

import React from 'react';
import styles from './AnnouncementItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const AnnouncementItem = ({ announcement, onReadMore }) => {
  if (!announcement) {
    console.error('Announcement prop is missing');
    return null;
  }

  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <div className={styles.tag}>{announcement.tag}</div>
        <div className={styles.date}>{announcement.date}</div>
      </div>
      <h2 className={styles.title}>{announcement.title}</h2>
      <p className={styles.description}>{announcement.description}</p>
      <div className={styles.actions}>
        <div className={styles.comments}>
          <FontAwesomeIcon icon={faComments} className={styles.icon} />
          <span>{`Comments (${announcement.comments})`}</span>
        </div>
        <button
          className={styles.readMoreButton}
          onClick={() => onReadMore(announcement.id)}
          aria-label={`Read more about ${announcement.title}`}
        >
          Read More
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </button>
      </div>
    </div>
  );
};

AnnouncementItem.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.number.isRequired,
  }).isRequired,
  onReadMore: PropTypes.func.isRequired,
};

export default AnnouncementItem;
