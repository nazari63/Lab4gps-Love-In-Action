// src/pages/MembersPages/Resources/ResourceItem.js

import React from 'react';
import styles from './ResourceItem.module.css';
import { FaDownload, FaEllipsisV } from 'react-icons/fa';
import { getIconByFileType } from '../../../utils/iconHelper';

const ResourceItem = ({ resource, onDownload }) => {
  const Icon = getIconByFileType(resource.fileType);

  return (
    <div className={styles.card}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.icon}>
            <Icon />
          </div>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>{resource.title}</h3>
            <p className={styles.fileDetails}>
              {resource.fileType} &bull; {resource.size}
            </p>
          </div>
        </div>
        <span
          className={`${styles.status} ${
            resource.status.toLowerCase() === 'approved'
              ? styles.approved
              : styles.pending
          }`}
        >
          {resource.status}
        </span>
      </div>

      {/* Description */}
      <p className={styles.description}>{resource.description}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {resource.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <div className={styles.authorInfo}>
          <img
            src={resource.author.avatar}
            alt={resource.author.name}
            className={styles.avatar}
          />
          <span className={styles.authorName}>{resource.author.name}</span>
        </div>
        <span className={styles.date}>{resource.date}</span>
        <div className={styles.actions}>
          <button
            className={styles.downloadButton}
            onClick={() => onDownload(resource.id)}
            aria-label={`Download ${resource.title}`}
          >
            <FaDownload /> Download
          </button>
          <FaEllipsisV className={styles.moreIcon} />
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;
