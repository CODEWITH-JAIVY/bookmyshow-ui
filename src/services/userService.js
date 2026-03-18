import api from '../api/axiosConfig';

const userService = {
  register: (data) => api.post('/users/register', data).then(r => r.data),
  login: (data) => api.post('/users/login', data).then(r => r.data),
  getById: (id) => api.get(`/users/${id}`).then(r => r.data),
};

export default userService;