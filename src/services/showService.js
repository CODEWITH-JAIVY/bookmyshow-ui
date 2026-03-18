import api from '../api/axiosConfig';

const showService = {
  add: (data) => api.post('/shows', data).then(r => r.data),
  getAll: () => api.get('/shows').then(r => r.data),
  getById: (id) => api.get(`/shows/${id}`).then(r => r.data),
  getByMovie: (movieId) => api.get(`/shows/movie/${movieId}`).then(r => r.data),
};

export default showService;