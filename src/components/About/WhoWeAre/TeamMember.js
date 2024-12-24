import React from 'react';
import PropTypes from 'prop-types';
import styles from './TeamMember.module.css';

const TeamMember = ({ title, iconSrc, description }) => {
  return (
    <article className={styles.teamMember}>
      <div className={styles.iconWrapper}>
        {/* iconSrc will be an element like <FaHandshake /> */}
        {iconSrc}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
};

TeamMember.propTypes = {
  title: PropTypes.string.isRequired,
  // Now it's expecting a React node (an element), not a string
  iconSrc: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
};

export default TeamMember;
