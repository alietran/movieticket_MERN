// TỰ CẤU HÌNH AXIOS

// File nhận phương thức json get post
import axios from "axios";
export const DOMAIN = "http://localhost:5000";
export const TOKEN = "token";

export class baseService {
  get = (url) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };

  post = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };

  patch = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "PATCH",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
  delete = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
      },
    });
  };
}
