import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

const update = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const userService = {
  getAll,
  create,
  update,
  remove,
};

export default userService;
