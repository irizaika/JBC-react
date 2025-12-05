import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/van`;

export const getVans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

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
