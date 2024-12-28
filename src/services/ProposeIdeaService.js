import api from "./api"; // Axios instance configured in api.js

const ProposeIdeaService = {
  /**
   * Submit a new idea
   * @param {FormData} formData - FormData object containing the idea details
   * @returns {Promise} - Axios promise for the API call
   */
  submitIdea: (formData) => {
    return api.post("/ideas/submit/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Fetch a list of ideas
   * @param {Object} params - Optional query parameters (e.g., proposer=true)
   * @returns {Promise} - Axios promise for the API call
   */
  fetchIdeas: (params = {}) => {
    return api.get("/ideas/", { params });
  },

  /**
   * Fetch details of a specific idea by ID
   * @param {number} ideaId - ID of the idea to fetch
   * @returns {Promise} - Axios promise for the API call
   */
  fetchIdeaDetails: (ideaId) => {
    return api.get(`/ideas/${ideaId}/`);
  },

  /**
   * Update an existing idea
   * @param {number} ideaId - ID of the idea to update
   * @param {Object} data - Object containing updated idea details
   * @returns {Promise} - Axios promise for the API call
   */
  updateIdea: (ideaId, data) => {
    return api.put(`/ideas/${ideaId}/`, data);
  },

  /**
   * Delete an idea
   * @param {number} ideaId - ID of the idea to delete
   * @returns {Promise} - Axios promise for the API call
   */
  deleteIdea: (ideaId) => {
    return api.delete(`/ideas/${ideaId}/`);
  },

  /**
   * Update the status of an idea (admin only)
   * @param {number} ideaId - ID of the idea to update status for
   * @param {Object} data - Object containing the new status
   * @returns {Promise} - Axios promise for the API call
   */
  updateIdeaStatus: (ideaId, data) => {
    return api.put(`/ideas/${ideaId}/status/`, data);
  },
};

export default ProposeIdeaService;
