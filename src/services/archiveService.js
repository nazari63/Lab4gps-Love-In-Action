import api from "./api"; // Import the configured Axios instance

const ArchiveService = {
  // Fetch categories
  getCategories: async () => {
    try {
      const response = await api.get("/archive/categories/");
      return response.data; // Returns the list of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Fetch tags
  getTags: async () => {
    try {
      const response = await api.get("/archive/tags/");
      return response.data; // Returns the list of tags
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },

  // Fetch files with optional filters
  getFiles: async (filters = {}) => {
    try {
      const params = {
        category: filters.category || "All",
        tags: filters.tags || [],
        search: filters.search || "",
        page: filters.page || 1,
      };
      const response = await api.get("/archive/files/", { params });
      return response.data; // Includes paginated files and total pages
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  },

  // Fetch a single file by ID
  getFileById: async (fileId) => {
    try {
      const response = await api.get(`/archive/files/${fileId}/`);
      return response.data; // Returns details of the file
    } catch (error) {
      console.error("Error fetching file:", error);
      throw error;
    }
  },

  // Upload a new file
  uploadFile: async (formData) => {
    try {
      const response = await api.post("/archive/files/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Returns the uploaded file details
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  // Update a file
  updateFile: async (fileId, updatedData) => {
    try {
      const response = await api.put(`/archive/files/${fileId}/`, updatedData);
      return response.data; // Returns the updated file details
    } catch (error) {
      console.error("Error updating file:", error);
      throw error;
    }
  },

  // Delete a file
  deleteFile: async (fileId) => {
    try {
      const response = await api.delete(`/archive/files/${fileId}/`);
      return response.data; // Confirms deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },

  // Like or unlike a file
  toggleLike: async (fileId) => {
    try {
      const response = await api.post(`/archive/files/${fileId}/like/`);
      return response.data; // Returns the like/unlike status
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },

  // Add a comment to a file
  addComment: async (fileId, commentText) => {
    try {
      const response = await api.post(`/archive/files/${fileId}/comments/`, {
        text: commentText,
      });
      return response.data; // Returns the added comment details
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  // Download a file and increment the download count
  downloadFile: async (fileId) => {
    try {
      const response = await api.get(`/archive/files/${fileId}/download/`);
      return response.data; // Returns the file details and increments downloads
    } catch (error) {
      console.error("Error downloading file:", error);
      throw error;
    }
  },
};

export default ArchiveService;
