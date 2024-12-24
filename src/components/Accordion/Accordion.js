import React, { useState } from 'react';
import styles from './Accordion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

/**
 * @param {string}  title        - The accordion title (left column).
 * @param {string}  content      - The full content for the accordion.
 * @param {boolean} defaultOpen  - If true, the accordion is open by default.
 */
const ThreeColumnAccordion = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      <div className={styles.header}>
        {/* Left Column: Title */}
        <div className={styles.title}>{title}</div>

        {/* Center Column: The same description container, 
            toggles between truncated & full via isOpen */}
        <div className={
          isOpen
            ? styles.fullDescription
            : styles.truncatedDescription
        }>
          {content}
        </div>

        {/* Right Column: +/- icon */}
        <button 
          className={styles.toggleButton} 
          onClick={toggleAccordion}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </button>
      </div>
    </div>
  );
};

export default ThreeColumnAccordion;
