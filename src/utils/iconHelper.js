// src/utils/iconHelper.js

import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileVideo, FaFileAlt } from 'react-icons/fa';

export const getIconByFileType = (fileType) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return () => <FaFilePdf color="#EF4444" />; // Red
    case 'word':
      return () => <FaFileWord color="#10B981" />; // Green
    case 'pptx':
      return () => <FaFilePowerpoint color="#F59E0B" />; // Yellow
    case 'mp4':
      return () => <FaFileVideo color="#3B82F6" />; // Blue
    default:
      return () => <FaFileAlt color="#6B7280" />; // Grey
  }
};
