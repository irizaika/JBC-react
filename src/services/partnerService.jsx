import axios from "axios";

const API_URL = "https://localhost:7176/api/partner"; // adjust to your API URL

export const getPartners = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//not used
// export const getPartner = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

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
