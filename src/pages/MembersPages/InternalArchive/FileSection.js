// src/components/MembersPages/InternalArchive/FileSection.js

import React from 'react';
import styles from './FileSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FileSection = ({ title, files, viewAll, getFileIcon, getFileColor }) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button 
          className={styles.viewAllButton} 
          onClick={viewAll}
          aria-label={`View all ${title}`}
        >
          View All
        </button>
      </div>
      <div className={styles.fileList}>
        {files.map((file) => (
          <div key={file.id} className={styles.fileItem}>
            <FontAwesomeIcon 
              icon={getFileIcon(file.name)} 
              className={styles.fileIcon} 
              color={getFileColor(file.name)} // Apply dynamic color
            />
            <div className={styles.fileDetails}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileInfo}>{file.info}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileSection;
