// src/services/AnnouncementsService.js

import api from './api';

const AnnouncementsService = {
  getAllAnnouncements: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },
  createAnnouncement: async (announcement) => {
    const response = await api.post('/announcements', announcement);
    return response.data;
  },
  deleteAnnouncement: async (id) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  },
  updateAnnouncement: async (id, updatedAnnouncement) => {
    const response = await api.put(`/announcements/${id}`, updatedAnnouncement);
    return response.data;
  },
};

export default AnnouncementsService;
