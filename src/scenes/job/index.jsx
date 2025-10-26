import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import DateRangeSelector from "./DateRangeSelector";
import JobListLinearView from "./JobListLinearView";
import JobCreateDialog from "./JobCreateDialog";

import { getJobTypes } from "../../services/jobTypeService"; // or separate services
import { getPartners } from "../../services/partnerService"; // or separate services
import { toSelectOptions, toLookupMap } from "../../utils/mapHelper";
import { useCrud } from "../../hooks/useCrud";
import dayjs from "dayjs";
import {
  getJobsByRange,
  updateJob,
  deleteJob,
  createJob,
} from "../../services/jobService";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";
import { getContractors } from "../../services/contractorService";
import { getVans } from "../../services/vanService";

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const Job = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 // const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [partners, setPartners] = useState([]);
  const [partnersFormatted, setPartnersFormatted] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobTypesFormatted, setJobTypesFormatted] = useState([]);

  const [contractorList, setContractorList] = useState([]);
  const [contractorListLookup, setContractorListLookup] = useState([]);
  const [vanList, setVanList] = useState([]);
  const [vanListLookup, setVanListLookup] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const api = {
    getAll: getJobsByRange,
    create: createJob,
    update: updateJob,
    delete: deleteJob,
  };

  const crud = useCrud(api);

  useEffect(() => {
    // Fetch partners from backend
    const fetchPartners = async () => {
      try {
        const partners = await getPartners();
        setPartnersFormatted(toSelectOptions(partners, "id", "companyName"));
        setPartners(toLookupMap(partners, "id", "companyName"));
      } catch (error) {
        console.error("Failed to load partner list:", error);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    // Fetch job types from backend
    const fetchJobTypes = async () => {
      try {
        const jobTypes = await getJobTypes();
        setJobTypesFormatted(toSelectOptions(jobTypes, "id", "name"));
        setJobTypes(toLookupMap(jobTypes, "id", "name"));
      } catch (error) {
        console.error("Failed to load job types:", error);
      }
    };

    fetchJobTypes();
  }, []);

  useEffect(() => {
    // Fetch job types from backend
    const fetchContractorList = async () => {
      try {
        const contarctors = await getContractors();
        setContractorList(toSelectOptions(contarctors, "id", "name", false));
        setContractorListLookup(toLookupMap(contarctors, "id", "name", false));
      } catch (error) {
        console.error("Failed to load contactrs:", error);
      }
    };

    fetchContractorList();
  }, []);

  useEffect(() => {
    // Fetch job types from backend
    const fetchVanList = async () => {
      try {
        const vans = await getVans();
        setVanList(toSelectOptions(vans, "id", "vanName", false));
        setVanListLookup(toLookupMap(vans, "id", "vanName", false));
      } catch (error) {
        console.error("Failed to load van list:", error);
      }
    };

    fetchVanList();
  }, []);

  const handleDateRangeChange = ([start, end]) => {
    setStartDate(start);
    setEndDate(end);
    setJobs([]);
  };

  useEffect(() => {
    if (!startDate || !endDate) return; // don't fetch if dates are null

    const fetchJobInRange = async () => {
      try {
        const jobs = await getJobsByRange(startDate, endDate);
        var jobsByDate = {};
        jobs.forEach((item) => {
          jobsByDate[dayjs(item.date).format("YYYY-MM-DD")] = item.jobs;
        });
        setJobs(jobsByDate);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };

    fetchJobInRange();
  }, [startDate, endDate, crud.rows]); // run whenever the date range changes

  return (
    <Box>
      <Grid sx={{ p: 2 }}>
        
        <DateRangeSelector onChange={handleDateRangeChange} />
        
        <JobListLinearView
          // jobsByDate={jobsByDate}
          jobsByDate={jobs}
          partnersList={partners}
          jobTypesList={jobTypes}
          vanList={vanListLookup}
          contractorList={contractorListLookup}
          onAdd={(date) => {
            setSelectedJob(null);
            setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
            crud.handleOpenAdd();
          }}
          onEdit={(job) => {
            setSelectedJob(job);
            setSelectedDate(dayjs(job.date).format("YYYY-MM-DD"));
            crud.handleOpenEdit(job);
          }}
          //           onAdd={(date) => navigate(`/jobs/new?date=${date}`)}
          // onEdit={(job) => navigate(`/jobs/edit/${job.id}`)}
          onDelete={(job) => crud.handleDelete(job)} // to do add confirmation
        />
      </Grid>

      {/* Add/Edit Dialog */}
      {/* <EntityDialog
        open={crud.open}
        handleClose={crud.handleClose}
        handleSave={crud.handleSave}
        isEdit={crud.isEdit}
        loading={crud.loading}
        error={crud.error}
        initialValues={
          selectedJob || {
            date: selectedDate,
            jobTypeId: null,
            partnerId: null,
            customerName: "",
            details: "",
            count: 1,
            payReceived: 0,
            contractorList: contractorList,
            vanList: vanList,

          }
        }
        fields={[
          { name: "date", label: "Job Date", type: "date", required : true },
          { name: "jobTypeId", label: "Job Type", type: "select", options: jobTypesFormatted },
          { name: "partnerId", label: "Partner", type: "select", options: partnersFormatted },
          { name: "customerName", label: "Customer Name", type: "text" },
          { name: "details", label: "Details", type: "text" },
          { name: "count", label: "Count", type: "decimal", required: false },
          { name: "payReceived", label: "Pay Received", type: "decimal", required: false },
          { name: "contractors", label: "Contractors", type: "multiselect", options: contractorList, required: false },
          { name: "vans", label: "Vans", type: "multiselect", options: vanList, required: false }
        ]}
        colors={colors}
        title="Job"
      /> */}

      <JobCreateDialog
        open={crud.open}
        handleClose={crud.handleClose}
        handleSave={crud.handleSave}
        loading={crud.loading}
        initialValues={
          selectedJob || {
            date: selectedDate || dayjs().format("YYYY-MM-DD"),
            jobTypeId: null,
            partnerId: null,
            customerName: null,
            details: null,
            count: 1,
            payReceived: 0,
            contractors: [{ contractorId: "", pay: 0 }],
            vans: [],
          }
        }
        jobTypes={jobTypesFormatted}
        partners={partnersFormatted}
        contractors={contractorList}
        vans={vanList}
        colors={colors}
      />
    </Box>
  );
};

export default Job;
