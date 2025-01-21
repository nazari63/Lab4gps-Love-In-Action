// src/components/MembersPages/InternalArchive/AllFilesTable.js

import React from 'react';
import styles from './AllFilesTable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faDownload,
  faShareAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

const AllFilesTable = ({ files, onDownload, onShare, onDelete, getFileIcon, getFileColor }) => {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>All Files</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            <th>Name</th>
            <th>Owner</th>
            <th>Last Modified</th>
            <th>File Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className={styles.tableRow}>
              <td>
                <div className={styles.fileName}>
                  <FontAwesomeIcon 
                    icon={getFileIcon(file.name)} 
                    className={styles.fileIcon} 
                    color={getFileColor(file.name)} // Apply dynamic color
                  />
                  {file.name}
                </div>
              </td>
              <td>
                <div className={styles.owner}>
                  <img 
                    src={file.owner.avatar} 
                    alt={`${file.owner.name} avatar`} 
                    className={styles.avatar} 
                  />
                  {file.owner.name}
                </div>
              </td>
              <td>{file.lastModified}</td>
              <td>{file.size}</td>
              <td>
                <div className={styles.actions}>
                  <button 
                    onClick={() => onDownload(file)} 
                    className={styles.actionButton}
                    aria-label={`Download ${file.name}`}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                  <button 
                    onClick={() => onShare(file)} 
                    className={styles.actionButton}
                    aria-label={`Share ${file.name}`}
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                  <button 
                    onClick={() => onDelete(file.id)} 
                    className={styles.actionButton}
                    aria-label={`Delete ${file.name}`}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button 
                    className={styles.moreButton}
                    aria-label={`More options for ${file.name}`}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFilesTable;
