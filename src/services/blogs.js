import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const config = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const createNew = async (blogData, token = 'no token') => {
  try {
    const response = await axios.post(baseUrl, blogData, config(token));
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const updateBlog = async (blogData, token = 'no token') => {
  try {
    const response = await axios.put(baseUrl + `/${blogData.id}`, blogData, config(token));
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const removeBlog = async (blogDataId, token = 'no token') => {
  try {
    const response = await axios.delete(baseUrl + `/${blogDataId}`, config(token));
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateBlog, removeBlog };
