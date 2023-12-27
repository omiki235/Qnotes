import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前の前処理
axiosClient.interceptors.request.use(async (config) => {
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    // ファイルをアップロードする場合は、Content-Type を手動で設定
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    // 通常の JSON リクエストの場合は、通常の設定を行う
    config.headers['Content-Type'] = 'application/json';
    config.headers['authorization'] = `Bearer ${getToken()}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }

    throw err.response;
  }
);

export default axiosClient;
