// src/components/ServeItem/ServeItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServeItem.module.css';

const ServeItem = ({ title, imageSrc = '', description }) => {
  return (
    <article className={styles.serveItem}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        {imageSrc && (
          <img
            className={styles.image}
            alt={`${title} Illustration`}
            src={imageSrc}
          />
        )}
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
};

ServeItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  description: PropTypes.string.isRequired,
};

// Removed defaultProps in favor of default parameters

export default ServeItem;
