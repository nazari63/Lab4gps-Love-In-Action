// src/pages/MembersPages/Resources/Resources.js

import React, { useState, useEffect } from 'react';
import styles from './Resources.module.css';
import Breadcrumbs from './Breadcrumbs';
import Header from './Header';
import Filters from './Filters';
import ResourceList from './ResourceList';
import Pagination from './Pagination';
import UploadModal from './UploadModal';
import resourcesData from '../../../data/resourcesData'; // Import mock data

const Resources = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    fileType: '',
    sortBy: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 6;
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  useEffect(() => {
    // Simulate fetching data from an API
    setResources(resourcesData);
  }, []);

  useEffect(() => {
    // Apply filters whenever resources or filters change
    let updatedResources = [...resources];

    // Filter by category (tags)
    if (filters.category) {
      updatedResources = updatedResources.filter((resource) =>
        resource.tags.includes(filters.category)
      );
    }

    // Filter by file type
    if (filters.fileType) {
      updatedResources = updatedResources.filter(
        (resource) =>
          resource.fileType.toLowerCase() === filters.fileType.toLowerCase()
      );
    }

    // Filter by status
    if (filters.status) {
      updatedResources = updatedResources.filter(
        (resource) =>
          resource.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Sort resources
    if (filters.sortBy === 'Latest') {
      updatedResources.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (filters.sortBy === 'Oldest') {
      updatedResources.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    setFilteredResources(updatedResources);
    setCurrentPage(1); // Reset to first page when filters change
  }, [resources, filters]);

  const handleUpload = (newResource) => {
    setResources((prev) => [newResource, ...prev]);
  };

  const handleDownload = (id) => {
    // Implement actual download logic here
    alert(`Download resource with ID: ${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current resources for pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <Header onUpload={handleUpload} />
      <Filters filters={filters} setFilters={setFilters} />
      <ResourceList resources={currentResources} onDownload={handleDownload} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Resources;
