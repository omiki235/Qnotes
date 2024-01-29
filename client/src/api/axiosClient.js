import axios from 'axios';

const BASE_URL = 'http://3.114.228.146/api';
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  config.headers['authorization'] = `Bearer ${getToken()}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (!err.response) {
      console.error(err);
    }
    return Promise.reject(err.response);
  }
);

export default axiosClient;
