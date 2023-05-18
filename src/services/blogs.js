import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createNew = async (blogData, token = 'no token') => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(baseUrl, blogData, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew };
