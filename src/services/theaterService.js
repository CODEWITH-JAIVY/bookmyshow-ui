import api from '../api/axiosConfig';

const theaterService = {
  add: (data) => api.post('/theaters', data).then(r => r.data),
  getAll: () => api.get('/theaters/getAllTheater').then(r => r.data),
  getById: (id) => api.get(`/theaters/${id}`).then(r => r.data),
  getByCity: (cityId) => api.get(`/theaters/city/${cityId}`).then(r => r.data),
};

export default theaterService;