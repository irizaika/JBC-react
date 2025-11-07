import axios from "axios";

const API_URL = "https://localhost:7176/api/contractor"; 

export const getContractors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getContractor = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

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
