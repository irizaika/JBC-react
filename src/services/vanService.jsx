import axios from "axios";

const API_URL = "https://localhost:7176/api/van"; // adjust to your API URL

export const getVans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getVan = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

export const createVan = async (van) => {
  const response = await axios.post(API_URL, van);
  return response.data;
};

export const updateVan = async (id, van) => {
  const response = await axios.put(`${API_URL}/${id}`, van);
  return response.data;
};

export const deleteVan = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
