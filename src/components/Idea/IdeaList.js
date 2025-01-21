// src/components/Idea/IdeaList.js

import React from 'react';
import styles from './IdeaList.module.css';
import IdeaCard from './IdeaCard';

const IdeaList = ({ ideas, onDownload, onSave, onShare }) => {
  return (
    <div className={styles.listContainer}>
      {ideas.length > 0 ? (
        <div className={styles.list}>
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onDownload={onDownload}
              onSave={onSave}
              onShare={onShare}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noIdeas}>No ideas found.</p>
      )}
    </div>
  );
};

export default IdeaList;
