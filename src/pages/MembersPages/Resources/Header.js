// src/pages/MembersPages/Resources/Header.js

import React from 'react';
import styles from './Header.module.css';
import { FaPlus } from 'react-icons/fa';

const Header = ({ onUpload }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Resource Library</h1>
      <button className={styles.uploadButton} onClick={onUpload}>
        <FaPlus /> Upload Resource
      </button>
    </div>
  );
};

export default Header;
