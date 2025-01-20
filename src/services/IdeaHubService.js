// src/services/IdeaHubService.js

import api from './api';

const IdeaHubService = {
  getApprovedIdeas: async () => {
    const response = await api.get('/ideas?status=approved');
    return response.data;
  },
  submitIdea: async (idea) => {
    const response = await api.post('/ideas', { ...idea, status: 'pending' });
    return response.data;
  },
  // Implement upvote/downvote and comments as needed
};

export default IdeaHubService;
