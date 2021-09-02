import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newObj = {
    id: getId(),
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};

const updatebyId = async (id, updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj);
  return response.data;
}

const anecdoteService = {
  getAll,
  createNew,
  updatebyId,
};

export default anecdoteService;
