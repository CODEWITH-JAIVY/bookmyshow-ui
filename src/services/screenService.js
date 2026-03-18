import api from '../api/axiosConfig';

const screenService = {
  add: (data) => api.post('/screens', data).then(r => r.data),
  getAll: () => api.get('/screens').then(r => r.data),
  getById: (id) => api.get(`/screens/${id}`).then(r => r.data),
  getByTheater: (theaterId) => api.get(`/screens/theater/${theaterId}`).then(r => r.data),
};

export default screenService;