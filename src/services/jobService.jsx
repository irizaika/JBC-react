import axios from "axios";

const API_URL = "https://localhost:7176/api/job";

export const getJobsByRange = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/range?start=${startDate.format("YYYY-MM-DD")}&end=${endDate.format("YYYY-MM-DD")}`);

  return response.data;
};

export const createJob = async (job) => {
  const response = await axios.post(API_URL, job);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await axios.put(`${API_URL}/${id}`, job);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.post(`${API_URL}/${id}`);
  return response.data;
};

