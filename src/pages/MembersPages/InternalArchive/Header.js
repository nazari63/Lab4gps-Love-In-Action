// src/components/MembersPages/InternalArchive/Header.js

import React from 'react';
import styles from './Header.module.css';
import Breadcrumbs from './Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onUpload }) => {
  return (
    <div className={styles.header}>
      <Breadcrumbs />
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Internal Archive</h1>
        <button className={styles.uploadButton} onClick={onUpload}>
          <FontAwesomeIcon icon={faCloudUploadAlt} className={styles.uploadIcon} />
          Upload New
        </button>
      </div>
    </div>
  );
};

export default Header;
