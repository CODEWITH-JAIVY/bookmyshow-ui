export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('bms_user'));
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  localStorage.setItem('bms_user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('bms_user');
};
