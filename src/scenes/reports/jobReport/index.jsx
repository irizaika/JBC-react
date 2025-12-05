import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarChart from "../../../components/CalendarChart";
import { toSelectOptions } from "../../../utils/mapHelper";
import JobCalendarFilters from "./JobCalendarFilters";

const JobReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const [calendarData, setCalendarData] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  // Filters
  const [selectedVan, setSelectedVan] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);

  // Options for filters
  const [vans, setVans] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [partners, setPartners] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  // Build dynamic title based on selected filters
const buildTitle = () => {
  const activeFilters = [];

  if (selectedVan) activeFilters.push(`Van: ${selectedVan.name || selectedVan.plate || selectedVan.id}`);
  if (selectedContractor) activeFilters.push(`Contractor: ${selectedContractor.name}`);
  if (selectedPartner) activeFilters.push(`Partner: ${selectedPartner.companyName}`);
  if (selectedJobType) activeFilters.push(`Job Type: ${selectedJobType.name}`);

  if (activeFilters.length === 0) return "Job Overview Calendar";

  return `Job Overview Calendar — ${activeFilters.join(" • ")}`;
};


  // Fetch options for filters (on mount)
  useEffect(() => {
    const fetchOptions = async () => {
      const [v, c, p, jt] = await Promise.all([
        axios.get(`${BASE_URL}/van`),
        axios.get(`${BASE_URL}/contractor`),
        axios.get(`${BASE_URL}/partner`),
        axios.get(`${BASE_URL}/jobType`),
      ]);
      setVans(v.data);
      setContractors(c.data);
      // setContractors(toSelectOptions(c.data, "id", "name", false));

      setPartners(p.data);
      setJobTypes(jt.data);
    };
    fetchOptions();
  }, []);

  // Fetch calendar data with filters
  useEffect(() => {
    const fetchCalendar = async () => {
      const params = {};
      if (selectedVan) params.vanId = selectedVan.id;
      if (selectedContractor) params.contractorId = selectedContractor.id;
      if (selectedPartner) params.partnerId = selectedPartner.id;
      if (selectedJobType) params.jobTypeId = selectedJobType.id;

      const { data } = await axios.get(`${BASE_URL}/reports/job-calendar`, {
        params,
      });
      setCalendarData(data);

      if (data.length > 0) {
        const min = data.reduce(
          (min, d) => (d.day < min ? d.day : min),
          data[0].day
        );
        const max = data.reduce(
          (max, d) => (d.day > max ? d.day : max),
          data[0].day
        );
        setMinDate(min);
        setMaxDate(max);
      }
    };
    fetchCalendar();
  }, [selectedVan, selectedContractor, selectedPartner, selectedJobType]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid sx={{ p: 2 }}>
      <JobCalendarFilters
        vans={vans}
        contractors={contractors}
        partners={partners}
        jobTypes={jobTypes}
        selectedVan={selectedVan}
        setSelectedVan={setSelectedVan}
        selectedContractor={selectedContractor}
        setSelectedContractor={setSelectedContractor}
        selectedPartner={selectedPartner}
        setSelectedPartner={setSelectedPartner}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
      />
        <Box
          height={"87vh"}
          // display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          gap={2}
          sx={{
            mt: 2,
            maxHeight: "77vh", //
            overflowY: "auto", // Enables vertical scroll
            overflowX: "hidden",
            pr: 1, // Avoids scrollbar overlapping content
            p: 2,
            mr: 1, // space from right edge works better than gap here
            borderRadius: 2,
            bgcolor: colors.primary[400],
            color: colors.grey[100],
            boxShadow: `0 2px 8px ${colors.primary[800]}`,
          }}
        >
          <Typography
            variant="h4"
            display="flex"
            justifyContent={"center"}
            sx={{ m: 2 }}
          >
            {buildTitle()}
          </Typography>

          {minDate && maxDate && calendarData.length > 0 && (
            <CalendarChart
              data={calendarData}
              startDate={minDate}
              endDate={maxDate}
              isDashboard={false}
            />
          )}
        </Box>
      </Grid>
    </LocalizationProvider>
  );
};

export default JobReport;
