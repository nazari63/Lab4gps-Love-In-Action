// src/components/MembersPages/InternalArchive/QuickActions.js

import React from 'react';
import styles from './QuickActions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuickActions = ({ actions }) => {
  return (
    <div className={styles.quickActions}>
      <h2 className={styles.title}>Quick Actions</h2>
      <div className={styles.actionsList}>
        {actions.map((action) => (
          <button 
            key={action.id} 
            className={styles.actionButton} 
            onClick={action.onClick}
            aria-label={action.label}
          >
            <FontAwesomeIcon 
              icon={action.icon} 
              className={styles.actionIcon} 
              color={action.color} // Apply color if provided
            />
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
