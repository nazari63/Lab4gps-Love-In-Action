// src/components/CommunityNews/LoadMoreButton.js

import React from 'react';
import styles from './LoadMoreButton.module.css';
import { FaArrowDown } from 'react-icons/fa';

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={styles.loadMoreButton} onClick={onClick}>
      Load More News <FaArrowDown className={styles.icon} />
    </button>
  );
};

export default LoadMoreButton;
