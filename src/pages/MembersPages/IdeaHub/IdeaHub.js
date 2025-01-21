// src/pages/MembersPages/IdeaHub/IdeaHub.js

import React, { useState, useEffect } from 'react';
import styles from './IdeaHub.module.css';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Header from './Header';
import IdeaList from '../../../components/Idea/IdeaList';
import Sidebar from '../../../components/Idea/Sidebar';
import UploadModal from '../../../components/Idea/UploadModal';
import ideaData from '../../../data/ideaData';

const IdeaHub = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [filterOption, setFilterOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      // Replace with actual API call in production
      setIdeas(ideaData);
      setFilteredIdeas(ideaData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedIdeas = [...ideas];

    // Filter by status
    if (filterOption) {
      updatedIdeas = updatedIdeas.filter((idea) => idea.status === filterOption);
    }

    // Sort ideas
    if (sortOption === 'Latest') {
      updatedIdeas.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'Oldest') {
      updatedIdeas.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredIdeas(updatedIdeas);
  }, [ideas, sortOption, filterOption]);

  const handleUpload = (newIdea) => {
    // Simulate API call
    setIdeas([newIdea, ...ideas]);
  };

  const handleDownload = (id) => {
    const idea = ideas.find((idea) => idea.id === id);
    if (idea) {
      // Implement actual download logic here
      alert(`Downloading Idea: ${idea.title}`);
    }
  };

  const handleSave = (id) => {
    // Implement save logic here
    alert(`Idea Saved: ID ${id}`);
  };

  const handleShare = (id) => {
    // Implement share logic here
    alert(`Idea Shared: ID ${id}`);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <Header
        onUpload={() => setIsModalOpen(true)}
        onSortChange={setSortOption}
        onFilterChange={setFilterOption}
        sortOption={sortOption}
        filterOption={filterOption}
      />
      <div className={styles.content}>
        <main className={styles.main}>
          <IdeaList
            ideas={filteredIdeas}
            onDownload={handleDownload}
            onSave={handleSave}
            onShare={handleShare}
          />
        </main>
        <Sidebar />
      </div>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default IdeaHub;
