import React, { useState, useEffect } from "react";
import { useTheme, Grid, Stack, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";
import PartnerReport from "./PartnerReport";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { transformToPieData } from "./util";
import ChartsGrid from "./ChartsGrid";
import DateRangeSelector from "./DateRangeSelector";

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const PartnersJobReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());

  //   const [totalPayData, setTotalPayData] = useState([{id: "", label: "", value: 0, color: ""}]);
  //   const [profitData, setProfitData] = useState([{id: "", label: "", value: 0, color: ""}]);
  //   const [charts, setCharts] = useState([{ id: "", title: "", data: [] }]);

  const [totalPayData, setTotalPayData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      console.log("Fetching report for dates:", startDate, endDate);
      var sd = startDate?.format?.("YYYY-MM-DD");
      var ed = endDate?.format?.("YYYY-MM-DD");
      console.log("Fetching report for dates:", sd, ed);

      const response = await axios.get(
        `https://localhost:7176/api/reports/partner-summary`,
        {
          params: { startDate: sd, endDate: ed },
        }
      );

      var pieChartData = transformToPieData(response.data, {
        idField: "partnerName",
        valueField: "totalPayReceived",
      });

      setTotalPayData(pieChartData);

      var pieChartProfitData = transformToPieData(response.data, {
        idField: "partnerName",
        valueField: "profit",
      });

      setProfitData(pieChartProfitData);

      const chartList = [
        { id: "totalPay", title: "Total Pay by Partner", data: pieChartData },
        { id: "profit", title: "Profit by Partner", data: pieChartProfitData },
        // more charts
      ];
      setCharts(chartList);
    };
    fetchReport();
  }, [startDate, endDate]);

  const handleDateRangeChange = ([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid sx={{ p: 2 }}>
        <DateRangeSelector onChange={handleDateRangeChange} />
             <Box
             height={"85vh"}

        // display="flex"
         alignItems="center"
         justifyContent="flex-start"
         flexWrap="wrap"
       gap={2}

        sx={{
            mt: 2,
            maxHeight: "75vh", // 
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
        <Typography variant="h4" display="flex" justifyContent={"center"} sx={{ m: 2 }}>
          Partner Job Summary for perioad {startDate?.format?.("YYYY-MM-DD") || startDate}{" "}
          → {endDate?.format?.("YYYY-MM-DD") || endDate}
        </Typography>


        <Stack
          spacing={0.5}
          // sx={{
          //   mt: 2,
          //   maxHeight: "75vh", // 
          //   overflowY: "auto", // Enables vertical scroll
          //   overflowX: "hidden",
          //   pr: 1, // Avoids scrollbar overlapping content
          // }}
        >
          <ChartsGrid charts={charts} />

          <PartnerReport startDate={startDate} endDate={endDate} />

        </Stack>
        </Box>
      </Grid>
    </LocalizationProvider>
  );
};

export default PartnersJobReport;
