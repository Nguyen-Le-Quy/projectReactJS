import api from "./api";
const list = (listid, itemid) =>
  api.get(`${api.url.lists}/${listid}/items/${itemid}`);

const get = (listid, itemid, id) =>
  api.get(`${api.url.lists}/${listid}/items/${itemid}/details/${id}`);

const add = (data) => api.post(api.url.details, data);
const update = (id, data) => api.put(`${api.url.details}/${id}`, data);
const remove = (id) => api.delete(`${api.url.details}/${id}`);

const detailService = {
  list,
  get,
  add,
  update,
  remove,
};
export default detailService;
