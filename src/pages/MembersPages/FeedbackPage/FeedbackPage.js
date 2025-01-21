// src/pages/MembersPages/FeedbackPage/FeedbackPage.js

import React, { useState, useEffect } from 'react';
import styles from './FeedbackPage.module.css';
import Breadcrumbs from '../../../components/Breadcrumbs/FeedbackBreadcrumbs';
import FeedbackHeader from '../../../components/Feedback/FeedbackHeader';
import DashboardStats from '../../../components/Feedback/DashboardStats';
import Filters from '../../../components/Feedback/Filters';
import FeedbackList from '../../../components/Feedback/FeedbackList';
import Pagination from '../../../components/Feedback/Pagination';
import UploadModal from '../../../components/Feedback/UploadModal';
import feedbackData from '../../../data/feedbackData'; // Mock data

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const feedbacksPerPage = 3;

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      // Replace with actual API call in production
      setFeedbacks(feedbackData);
      setFilteredFeedbacks(feedbackData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedFeedbacks = [...feedbacks];

    // Filter by category
    if (filterCategory !== 'All Categories') {
      updatedFeedbacks = updatedFeedbacks.filter(
        (fb) => fb.category === filterCategory
      );
    }

    // Filter by status
    if (filterStatus !== 'All Status') {
      updatedFeedbacks = updatedFeedbacks.filter(
        (fb) => fb.status === filterStatus
      );
    }

    // Sort feedbacks
    if (sortOption === 'Latest') {
      updatedFeedbacks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'Oldest') {
      updatedFeedbacks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredFeedbacks(updatedFeedbacks);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [feedbacks, sortOption, filterCategory, filterStatus]);

  // Get current feedbacks
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpload = (newFeedback) => {
    // Simulate API call
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const handleAddComment = (feedbackId, newComment) => {
    const updatedFeedbacks = feedbacks.map((fb) => {
      if (fb.id === feedbackId) {
        return {
          ...fb,
          comments: [...fb.comments, newComment],
        };
      }
      return fb;
    });
    setFeedbacks(updatedFeedbacks);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <FeedbackHeader onUpload={() => setIsModalOpen(true)} />
      <main className={styles.main}>
        <DashboardStats feedbacks={feedbacks} />
        <Filters
          sortOption={sortOption}
          onSortChange={setSortOption}
          filterCategory={filterCategory}
          onFilterCategoryChange={setFilterCategory}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
        />
        <FeedbackList
          feedbacks={currentFeedbacks}
          onAddComment={handleAddComment}
        />
        <Pagination
          feedbacksPerPage={feedbacksPerPage}
          totalFeedbacks={filteredFeedbacks.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </main>
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default FeedbackPage;
