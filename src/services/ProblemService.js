// src/services/ProblemService.js

import api from './api'; // Import the configured Axios instance (api.js)

/**
 * A service object providing methods to interact with the Problem endpoints.
 * Endpoints used (relative to `api.js` baseURL):
 *   - GET /problems/problems/
 *   - POST /problems/problems/
 *   - GET /problems/problems/<id>/
 *   - PATCH/PUT /problems/problems/<id>/
 *   - DELETE /problems/problems/<id>/
 * Optionally filter by ?contact_email=<user_email> on listing.
 */
const ProblemService = {
  /**
   * Create (POST) a new problem.
   * Handles actual file uploads for mediaFiles and submitterPhoto.
   *
   * This request REQUIRES authentication (Bearer token) based on your ProblemViewSet's rules.
   * If the user is authenticated, the backend automatically sets `submitter` to request.user.
   *
   * @param {Object} problemData - The problem data from your React form (SubmitProblem.js).
   * @returns {Promise<AxiosResponse<any>>}
   */
  async createProblem(problemData) {
    try {
      // Use FormData to handle file uploads
      const formData = new FormData();

      // Append basic text fields
      formData.append('problem_title', problemData.problemTitle);
      formData.append('description', problemData.description);
      formData.append('category', problemData.category || '');
      formData.append('urgency', problemData.urgency || '');
      formData.append('country', problemData.country || '');
      formData.append('city', problemData.city || '');
      formData.append('latitude', problemData.coordinates?.lat || '');
      formData.append('longitude', problemData.coordinates?.lng || '');
      formData.append('contact_name', problemData.contactName);
      formData.append('contact_email', problemData.contactEmail);
      formData.append('contact_phone', problemData.contactPhone);

      // Handle media_files_upload (multiple files)
      if (problemData.mediaFiles && problemData.mediaFiles.length > 0) {
        Array.from(problemData.mediaFiles).forEach((file) => {
          formData.append('media_files_upload', file);
        });
      }

      // Handle submitter_photo (single file)
      if (problemData.submitterPhoto) {
        formData.append('submitter_photo', problemData.submitterPhoto);
      }

      // POST to /problems/problems/
      const response = await api.post('/problems/problems/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      console.error('Error creating problem:', error);
      throw error;
    }
  },

  /**
   * Retrieve (GET) all problems. 
   * No authentication required (per your ProblemViewSet rules).
   *
   * @returns {Promise<AxiosResponse<any>>} - An array of Problem objects on success
   */
  async getAllProblems() {
    try {
      // GET /problems/problems/
      const response = await api.get('/problems/problems/');
      return response;
    } catch (error) {
      console.error('Error fetching all problems:', error);
      throw error;
    }
  },

  /**
   * Retrieve (GET) problems filtered by contact_email.
   * No authentication required for listing.
   *
   * @param {string} email - The contact_email to filter by
   * @returns {Promise<AxiosResponse<any>>} - Filtered array of Problem objects
   */
  async getProblemsByContactEmail(email) {
    try {
      // GET /problems/problems/?contact_email=<email>
      const response = await api.get('/problems/problems/', {
        params: { contact_email: email },
      });
      return response;
    } catch (error) {
      console.error('Error fetching problems by contact email:', error);
      throw error;
    }
  },

  /**
   * Retrieve (GET) a single problem by ID.
   * No authentication required (per your ProblemViewSet rules).
   *
   * @param {number|string} problemId - The primary key (ID) of the problem
   * @returns {Promise<AxiosResponse<any>>} - The single Problem object on success
   */
  async getProblemById(problemId) {
    try {
      // GET /problems/problems/<problemId>/
      const response = await api.get(`/problems/problems/${problemId}/`);
      return response;
    } catch (error) {
      console.error(`Error fetching problem ID=${problemId}:`, error);
      throw error;
    }
  },

  /**
   * Update (PATCH or PUT) a problem by ID.
   * Requires authentication.
   *
   * @param {number|string} problemId - The primary key (ID) of the problem
   * @param {Object} updatedData - The data to update
   * @param {boolean} isPartial - Whether to use PATCH (partial) or PUT (full)
   * @returns {Promise<AxiosResponse<any>>} - The updated Problem object on success
   */
  async updateProblem(problemId, updatedData, isPartial = true) {
    try {
      // Decide between PATCH or PUT
      const method = isPartial ? 'patch' : 'put';

      // Use FormData if updating files, otherwise send JSON
      let data;
      let headers = {};

      if (updatedData.media_files_upload || updatedData.submitter_photo) {
        data = new FormData();
        for (const key in updatedData) {
          if (key === 'media_files_upload') {
            Array.from(updatedData.media_files_upload).forEach((file) => {
              data.append('media_files_upload', file);
            });
          } else if (key === 'submitter_photo') {
            if (updatedData.submitter_photo) {
              data.append('submitter_photo', updatedData.submitter_photo);
            }
          } else {
            data.append(key, updatedData[key]);
          }
        }
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        data = updatedData;
        headers['Content-Type'] = 'application/json';
      }

      const response = await api[method](
        `/problems/problems/${problemId}/`,
        data,
        { headers }
      );
      return response;
    } catch (error) {
      console.error(`Error updating problem ID=${problemId}:`, error);
      throw error;
    }
  },

  /**
   * Delete (DELETE) a problem by ID.
   * Requires authentication.
   *
   * @param {number|string} problemId - The primary key (ID) of the problem
   * @returns {Promise<AxiosResponse<any>>} - Usually a 204 No Content on success
   */
  async deleteProblem(problemId) {
    try {
      // DELETE /problems/problems/<problemId>/
      const response = await api.delete(`/problems/problems/${problemId}/`);
      return response;
    } catch (error) {
      console.error(`Error deleting problem ID=${problemId}:`, error);
      throw error;
    }
  },
};

export default ProblemService;
