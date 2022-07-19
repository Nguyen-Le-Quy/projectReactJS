import api from "./api";

const list = () => api.get(api.url.settings);

const get = (id) => api.get(`${api.url.settings}/${id}`);

const add = (data) => api.post(api.url.settings, data);

const update = (id, data) => api.put(`${api.url.settings}/${id}`, data);

const remove = (id) => api.delete(`${api.url.settings}/${id}`);

const settingService = {
  list,
  get,
  add,
  update,
  remove,
};
export default settingService;
