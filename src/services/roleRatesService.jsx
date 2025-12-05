import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/rolePay`;

export const getRoleRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

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
