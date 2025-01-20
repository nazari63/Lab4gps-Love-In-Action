// src/services/AdminApprovalService.js

import api from './api';

const AdminApprovalService = {
  getPendingPosts: async () => {
    const response = await api.get('/posts?status=pending');
    return response.data;
  },
  updatePostStatus: async (postId, status) => {
    const response = await api.put(`/posts/${postId}/status`, { status });
    return response.data;
  },
  // Optionally, add notification functions
  // notifyAuthor: async (authorId, status) => {
  //   await api.post('/notifications', { authorId, message: `Your post has been ${status}.` });
  // },
};

export default AdminApprovalService;
