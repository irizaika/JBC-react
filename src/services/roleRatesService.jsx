import axios from "axios";

const API_URL = "https://localhost:7176/api/rolePay"; // adjust to your API URL

export const getRoleRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getVan = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

export const createRoleRate = async (rolePay) => {
  const response = await axios.post(API_URL, rolePay);
  return response.data;
};

export const updateRoleRate = async (id, rolePay) => {
  const response = await axios.put(`${API_URL}/${id}`, rolePay);
  return response.data;
};

export const deleteRoleRate = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
