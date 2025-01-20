// src/pages/InternalArchive/InternalArchive.js

import React, { useEffect, useState } from 'react';
import archiveService from '../../services/archiveService';
import '../../components/styles/InternalArchive.css';

const InternalArchive = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await archiveService.getDocuments();
        setDocuments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load documents.');
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="internal-archive">
      <h2>Internal Archive</h2>
      <input type="text" placeholder="Search documents..." className="search-input" />
      <div className="document-list">
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <a href={doc.link} target="_blank" rel="noopener noreferrer">View Document</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternalArchive;
