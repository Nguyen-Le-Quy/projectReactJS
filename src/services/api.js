import axios from "axios";
import store from "./../store/index";
import { hideLoading, showLoading } from "react-redux-loading-bar";
const url = {
  baseUrl: "https://62b73d7a0d4a2cd3e1a93b2b.mockapi.io/api",
  lists: "/lists",
  settings: "/settings",
};
const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.Authorization = `Bearer ${state.auth.token}`;
  }
  store.dispatch(showLoading());
  return request;
});

instance.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    return response.data;
  },

  (error) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    if (!error.response) {
      window.location.href = "/no-internet";
    } else {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/no-permission";
          break;
        default:
          break;
      }
      return Promise.reject(Error);
    }
  }
);

const api = {
  url, // url : url
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
  promise: axios.all,
  spread: axios.spread,
};
export default api;
