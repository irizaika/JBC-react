// src/hooks/useJobPlanner.jsx
import { useState, useEffect, useCallback } from "react";
import { getJobsByRange, createJob, updateJob, deleteJob } from "../services/jobService";

export const useJobPlanner = (initialStartDate, initialEndDate) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  // Load jobs for current date range
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobsByRange(startDate, endDate);
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // Refresh jobs for a specific day (optional)
  const refreshDay = useCallback(async (date) => {
    try {
      const dayJobs = await getJobsByRange(date, date);
      setJobs((prevJobs) => {
        // Remove jobs for that date and replace with new ones
        const filtered = prevJobs.filter(j => new Date(j.date).toDateString() !== new Date(date).toDateString());
        return [...filtered, ...dayJobs];
      });
    } catch (err) {
      console.error(err);
      setError("Failed to refresh day");
    }
  }, []);

  // Add a new job
  const addJob = useCallback(async (job) => {
    setLoading(true);
    setError(null);
    try {
      const savedJob = await createJob(job);
      setJobs((prev) => [...prev, savedJob]);
    } catch (err) {
      console.error(err);
      setError("Failed to add job");
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit existing job
  const editJob = useCallback(async (id, updatedJob) => {
    setLoading(true);
    setError(null);
    try {
      const savedJob = await updateJob(id, updatedJob);
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? savedJob : j))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update job");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete job
  const removeJob = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete job");
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically load jobs when date range changes
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    loadJobs,
    refreshDay,
    addJob,
    editJob,
    removeJob,
  };
};
