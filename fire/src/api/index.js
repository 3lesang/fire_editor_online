import axios from 'axios';

const config = {
  baseURL: '/api/v1',
};
const instance = axios.create(config);
instance.interceptors.request.use(
  function (req) {
    req.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
