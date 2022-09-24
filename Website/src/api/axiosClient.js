// axios cấu hình sẵn
//Hoặc sd axios này hoặc sd baseService

import axios from "axios";
export const DOMAIN = "http://localhost:5000";
export const TOKEN = "token";

const axiosClient = axios.create({
  baseURL: DOMAIN,
});

// header lấy token

axiosClient.interceptors.request.use((config) => {
  //tất cả request đều phải qua đây
  const user = localStorage.getItem("user");
  if (user) {
    // nếu có đăng nhập thì thực hiện
    const { token } = JSON.parse(user);
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.request.use((config) => {
  //tất cả request đều phải qua đây
  const movie = localStorage.getItem("movie");
  if (movie) {
    // nếu có đăng nhập thì thực hiện
    const { token } = JSON.parse(movie);
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;