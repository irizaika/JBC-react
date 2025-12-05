import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/contractorPay`;

export const getContractorRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createContractorRate = async (contractorPay) => {
  const response = await axios.post(API_URL, contractorPay);
  return response.data;
};

export const updateContractorRate = async (id, contractorPay) => {
  const response = await axios.put(`${API_URL}/${id}`, contractorPay);
  return response.data;
};

export const deleteContractorRate = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
