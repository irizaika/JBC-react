import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import HandymanIcon from "@mui/icons-material/Handyman";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaidIcon from "@mui/icons-material/Paid";
import Job from "../job/index";
import StatBox from "../../components/StatBox";
import CalendarChart from "../../components/CalendarChart";

import axios from "axios";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";
import DetailedContractorStats from "./DetailedContractorStats";
import DetailedVanStats from "./DetailedVanStats";

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/dashboard/stats`;
//import

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [stats, setStats] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());

  const monthName = dayjs().startOf("month").format("MMMM");  

  useEffect(() => {
    const loadStats = async () => {
      const sd = startDate.format("YYYY-MM-DD");
      const ed = endDate.format("YYYY-MM-DD");
      const response = await axios.get(API_URL,
        {
          params: { startDate: sd, endDate: ed },
        }
      );
      // const json = await response.data.json();
      setStats(response.data);
    };
    loadStats();
  }, []);

  const [calendarData, setCalendarData] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  // Fetch calendar data with filters
  useEffect(() => {
    const fetchCalendar = async () => {

      const { data } = await axios.get(`${BASE_URL}/reports/job-calendar`);
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
  }, []);


  if (!stats) {
    return (
      <Box
        m="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        {/* <CircularProgress /> */}
      </Box>
    );
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="110px"
        gap="20px"
        overflow={"hidden"}
      >
        {/* ROW 1 - Jobs for Today */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="10px 15px"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Typography
            variant="h5"
            sx={{
              color: colors.grey[100],
              mb: "10px",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            Today’s Jobs
          </Typography>

          {/* Compact jobs list */}
          <Box
            flex={1}
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colors.grey[700],
                borderRadius: "4px",
              },
            }}
          >
            <Job isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 5"
          borderRadius="12px"
          backgroundColor={colors.primary[400]}
          display="flex"
          //  alignItems="center"
          //  justifyContent="center"
        >
          <DetailedContractorStats />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          display="flex"
          //  alignItems="center"
          // justifyContent="center"
        >
          <DetailedVanStats />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          borderRadius="12px"
          alignItems="center"
          justifyContent="center"
        >
          {/* <DetailedStats /> */}
        </Box>
        {/* Profit */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          borderRadius="12px"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`£${stats.profit.profit.toLocaleString()}`}
            subtitle={`${monthName}'s revenue £${stats.profit.totalRevenue.toLocaleString()}`}
            progress={
              stats.profit.totalRevenue > 0
                ? stats.profit.profit / stats.profit.totalRevenue
                : 0
            }
            increase={`Cost £${stats.profit.totalContractorCost.toLocaleString()}`}
            icon={
              <PaidIcon sx={{ color: colors.burntOrange[600], fontSize: 28 }} />
            }
          />
        </Box>

        {/* ROW 3 */}
        {/* Vans */}
        <Box
          gridColumn="span 8"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={"40px"}
        >
                    {minDate && maxDate && calendarData.length > 0 && (
                      <CalendarChart
                        data={calendarData}
                        startDate={minDate}
                        endDate={maxDate}
                        isDashboard={true}
                      />
                    )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
