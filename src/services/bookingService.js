import api from "../api/axiosConfig";

const bookingService = {
  create: (data) => api.post("/bookings", data).then((r) => r.data),

  getById: (id) => api.get(`/bookings/${id}`).then((r) => r.data),

  getByUser: (userId) =>
    api.get(`/bookings/user/${userId}`).then((r) => r.data),

  cancel: (id) => api.put(`/bookings/${id}/cancel`).then((r) => r.data),

partialCancel: (id, seatIds) =>
  api.put(`/bookings/${id}/cancel-seats`, {
    seatIds: seatIds   
  }).then(r => r.data),
};

export default bookingService;
