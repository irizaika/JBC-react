import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/contractor`;

export const getContractors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createContractor = async (contractor) => {
  const response = await axios.post(API_URL, contractor);
  return response.data;
};

export const updateContractor = async (id, contractor) => {
  const response = await axios.put(`${API_URL}/${id}`, contractor);
  return response.data;
};

export const deleteContractor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getStatuses = async () => {
  const response = await axios.get(`${API_URL}/statuses`);
  return response.data;
};
