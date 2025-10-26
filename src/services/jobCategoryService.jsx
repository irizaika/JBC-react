import axios from "axios";

const API_URL = "https://localhost:7176/api/jobCategory"; // adjust to your API URL

export const getJobCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createJobCategory = async (jobCategory) => {
  const response = await axios.post(API_URL, jobCategory);
  return response.data;
};

export const updateJobCategory= async (id, jobCategory) => {
  const response = await axios.put(`${API_URL}/${id}`, jobCategory);
  return response.data;
};

export const deleteJobCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
