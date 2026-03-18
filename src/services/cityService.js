import api from '../api/axiosConfig';

const cityService = {
  add: (data) => api.post('/cities', data).then(r => r.data),
  getAll: () => api.get('/cities').then(r => r.data),
  getById: (id) => api.get(`/cities/${id}`).then(r => r.data),
};

export default cityService;