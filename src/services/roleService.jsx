import axios from "axios";

const API_URL = "https://localhost:7176/api/role"; // adjust to your API URL

export const getRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getVan = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

export const createRole = async (role) => {
  const response = await axios.post(API_URL, role);
  return response.data;
};

export const updateRole = async (id, role) => {
  const response = await axios.put(`${API_URL}/${id}`, role);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
