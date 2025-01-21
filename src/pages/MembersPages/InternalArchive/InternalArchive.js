// src/components/MembersPages/InternalArchive/InternalArchive.js

import React, { useState } from 'react';
import styles from './InternalArchive.module.css';
import Header from './Header';
import FileSection from './FileSection';
import QuickActions from './QuickActions';
import AllFilesTable from './AllFilesTable';
import { 
  faFolderPlus, 
  faShareAlt, 
  faDownload,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mapping of file extensions to Font Awesome icons
const fileTypeIcons = {
  pdf: faFilePdf,
  doc: faFileWord,
  docx: faFileWord,
  xls: faFileExcel,
  xlsx: faFileExcel,
  ppt: faFilePowerpoint,
  pptx: faFilePowerpoint,
  txt: faFileAlt,
  // Add more mappings as needed
};

// Mapping of file extensions to colors
const fileTypeColors = {
  pdf: '#E74C3C',        // Red
  doc: '#3498DB',        // Blue
  docx: '#3498DB',       // Blue
  xls: '#27AE60',        // Green
  xlsx: '#27AE60',       // Green
  ppt: '#F1C40F',        // Yellow
  pptx: '#F1C40F',       // Yellow
  txt: '#95A5A6',        // Gray
  // Add more mappings as needed
};

// Utility function to get the appropriate icon based on file extension
const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  return fileTypeIcons[extension] || faFileAlt; // Default to generic icon if extension not found
};

// Utility function to get the appropriate color based on file extension
const getFileColor = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  return fileTypeColors[extension] || '#95A5A6'; // Default to gray if extension not found
};



// Sample Data without the static 'icon' property
const initialRecentFiles = [
  {
    id: 1,
    name: 'Research_2025.pdf',
    info: 'Added yesterday',
  },
  {
    id: 2,
    name: 'Project_Report.docx',
    info: 'Added 2 days ago',
  }
];

const initialSharedWithMe = [
  {
    id: 3,
    name: 'Data_Analysis.xlsx',
    info: 'Shared by John D.',
  },
  {
    id: 4,
    name: 'Presentation.pptx',
    info: 'Shared by Sarah M.',
  }
];

const initialAllFiles = [
  {
    id: 1,
    name: 'Research_Report_2025.pdf',
    owner: { name: 'John Doe', avatar: 'path/to/img.png' },
    lastModified: 'Jan 15, 2025',
    size: '2.5 MB',
  },
  {
    id: 2,
    name: 'Market_Analysis_2025.xlsx',
    owner: { name: 'Alice Johnson', avatar: 'path/to/alice.png' },
    lastModified: 'Feb 20, 2025',
    size: '3.1 MB',
  },
  {
    id: 3,
    name: 'Design_Specs.pdf',
    owner: { name: 'Bob Smith', avatar: 'https://www.pinterest.com/pin/614882155378590568/' },
    lastModified: 'Mar 05, 2025',
    size: '4.7 MB',
  },
  {
    id: 4,
    name: 'User_Guide.docx',
    owner: { name: 'Carol White', avatar: 'path/to/carol.png' },
    lastModified: 'Apr 10, 2025',
    size: '1.8 MB',
  }
  // Add more file objects as needed
];

const InternalArchive = () => {
  const [recentFiles, setRecentFiles] = useState(initialRecentFiles);
  const [sharedWithMe, setSharedWithMe] = useState(initialSharedWithMe);
  const [allFiles, setAllFiles] = useState(initialAllFiles);

  const handleUpload = () => {
    alert('Show upload modal or implement drag-and-drop logic');
    // Implement actual upload logic here
  };

  const handleViewAllRecent = () => {
    alert('Navigate to Recent Files page');
    // Implement navigation logic here
  };

  const handleViewAllShared = () => {
    alert('Navigate to Shared with Me page');
    // Implement navigation logic here
  };

  const handleDownload = (file) => {
    alert(`Downloading ${file.name}`);
    // Implement download logic here
  };

  const handleShare = (file) => {
    alert(`Sharing ${file.name}`);
    // Implement share logic here
  };

  const handleDelete = (id) => {
    setAllFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const quickActions = [
    {
      id: 1,
      label: 'Create New Folder',
      icon: faFolderPlus,
      onClick: () => alert('Create New Folder')
    },
    {
      id: 2,
      label: 'Share Files',
      icon: faShareAlt,
      onClick: () => alert('Share Files')
    },
    {
      id: 3,
      label: 'Download All',
      icon: faDownload,
      onClick: () => alert('Download All')
    }
  ];

  return (
    <div className={styles.main}>
      {/* Header and Quick Actions Section */}
      <Header onUpload={handleUpload} />

      <div className={styles.snapshotActions}>
        {/* Recent Files Section */}
        <FileSection
          title="Recent Files"
          files={recentFiles}
          viewAll={handleViewAllRecent}
          getFileIcon={getFileIcon}
          getFileColor={getFileColor} // Pass the color function
        />
        {/* Shared with Me Section */}
        <FileSection
          title="Shared with Me"
          files={sharedWithMe}
          viewAll={handleViewAllShared}
          getFileIcon={getFileIcon}
          getFileColor={getFileColor} // Pass the color function
        />
        <QuickActions actions={quickActions} />
      </div>

      {/* All Files Table */}
      <AllFilesTable
        files={allFiles}
        onDownload={handleDownload}
        onShare={handleShare}
        onDelete={handleDelete}
        getFileIcon={getFileIcon}
        getFileColor={getFileColor} // Pass the color function
      />
    </div>
  );
};

export default InternalArchive;
