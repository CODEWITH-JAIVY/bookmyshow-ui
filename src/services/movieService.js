import api from '../api/axiosConfig';

const movieService = {
  add: (data) => api.post('/movies', data).then(r => r.data),
  getAll: () => api.get('/movies').then(r => r.data),
  getById: (id) => api.get(`/movies/${id}`).then(r => r.data),
  delete: (id) => api.delete(`/movies/${id}`).then(r => r.data),
  update: (id, data) => api.put(`/movies/${id}`, data).then(r => r.data),
};

export default movieService;