import axios from "axios";
const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then(res => res.data);
};

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then(res => res.data);
};

const noteService = {
  getAll,
  create,
  update,
};

export default noteService;
