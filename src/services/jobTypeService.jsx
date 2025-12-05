import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/jobType`;

export const getJobTypes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createJobType = async (jobType) => {
  const response = await axios.post(API_URL, jobType);
  return response.data;
};

export const updateJobType = async (id, jobType) => {
  const response = await axios.put(`${API_URL}/${id}`, jobType);
  return response.data;
};

export const deleteJobType = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
