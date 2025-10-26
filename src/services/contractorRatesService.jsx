import axios from "axios";

const API_URL = "https://localhost:7176/api/contractorPay"; // adjust to your API URL

export const getContractorRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getVan = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

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
