import React, { useState } from 'react';
import styles from './SingleColumnAccordion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

/**
 * SingleColumnAccordion
 *  - Title & +/- in a row
 *  - Description below in the same column
 *  - defaultOpen = whether it's expanded by default
 */
const SingleColumnAccordion = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionContainer}>
      {/* Row with Title & +/- icon */}
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <button
          className={styles.toggleButton}
          onClick={toggleAccordion}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </button>
      </div>

      {/* Description in the same column, truncated if not open */}
      <div className={isOpen ? styles.openDescription : styles.closedDescription}>
        {content}
      </div>
    </div>
  );
};

export default SingleColumnAccordion;
