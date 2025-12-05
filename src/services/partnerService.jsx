import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/partner`;

export const getPartners = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPartner = async (partner) => {
  const response = await axios.post(API_URL, partner);
  return response.data;
};

export const updatePartner = async (id, partner) => {
  const response = await axios.put(`${API_URL}/${id}`, partner);
  return response.data;
};

export const deletePartner = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
