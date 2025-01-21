// src/components/CommunityNews/Header.js

import React from 'react';
import styles from './Header.module.css';
import { FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Community News</h1>
      <button className={styles.submitButton}>
        <FaPlus className={styles.icon} />
        Submit News
      </button>
    </header>
  );
};

export default Header;
