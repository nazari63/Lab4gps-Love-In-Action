// src/components/Decision/DecisionList.js

import React from 'react';
import styles from './DecisionList.module.css';
import DecisionCard from './DecisionCard';

const DecisionList = ({ decisions }) => {
  if (decisions.length === 0) {
    return <p className={styles.noDecisions}>No decisions found.</p>;
  }

  return (
    <section className={styles.decisionList}>
      {decisions.map((decision) => (
        <DecisionCard key={decision.id} decision={decision} />
      ))}
    </section>
  );
};

export default DecisionList;
