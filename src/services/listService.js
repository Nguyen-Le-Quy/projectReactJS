import api from "./api";

const list = () => api.get(api.url.lists);
const get = (id) => api.get(`${api.url.lists}/${id}`);
const add = (data) => api.post(api.url.lists, data);
const update = (id, data) => api.put(`${api.url.lists}/${id}`, data);
const remove = (id) => api.delete(`${api.url.lists}/${id}`);

const listService = {
  list,
  get,
  add,
  update,
  remove,
};
export default listService;
