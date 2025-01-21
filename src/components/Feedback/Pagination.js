// src/components/Feedback/Pagination.js

import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({
  feedbacksPerPage,
  totalFeedbacks,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFeedbacks / feedbacksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginationNav} aria-label="Feedback Pagination">
      <ul className={styles.paginationList}>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={styles.pageButton}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${styles.pageButton} ${
                currentPage === number ? styles.active : ''
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={styles.pageButton}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
