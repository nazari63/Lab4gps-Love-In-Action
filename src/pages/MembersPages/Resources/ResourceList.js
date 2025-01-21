// src/pages/MembersPages/Resources/ResourceList.js

import React from 'react';
import styles from './ResourceList.module.css';
import ResourceItem from './ResourceItem';

const ResourceList = ({ resources, onDownload }) => {
  if (resources.length === 0) {
    return <div className={styles.noResources}>No resources found.</div>;
  }

  return (
    <div className={styles.list}>
      {resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} onDownload={onDownload} />
      ))}
    </div>
  );
};

export default ResourceList;
