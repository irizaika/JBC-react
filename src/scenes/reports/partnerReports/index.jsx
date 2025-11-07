import React, { useState, useEffect } from "react";
import { useTheme, Grid, Stack, Typography, Box } from "@mui/material";
import { tokens } from "../../../theme";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";
import PartnerReportTable from "./PartnerReportTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { transformPartnerInfoToBarData, transformPartnerInfoToPieData } from "../util";
import ChartsGrid from "./ChartsGrid";
import DateRangeSelector from "../DateRangeSelector";
import BarChart from "../../../components/BarChart"

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const PartnersJobReport = ({isDashboard = false}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [combineNoPartner, setCombineNoPartner] = useState(true);
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState();
  
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      const sd = startDate.format("YYYY-MM-DD");
      const ed = endDate.format("YYYY-MM-DD");
      const { data: result } = await axios.get("https://localhost:7176/api/reports/partner-summary", {
        params: { startDate: sd, endDate: ed, combineNoPartner },
      });

      // Force new object references for React change detection
      const freshData = [...result];
      const freshBar = transformPartnerInfoToBarData(freshData);
      const freshPiePay = transformPartnerInfoToPieData(freshData, { idField: "partnerName", valueField: "totalPayReceived" });
      const freshPieProfit = transformPartnerInfoToPieData(freshData, { idField: "partnerName", valueField: "profit" });
      const freshCharts = [
        { id: "totalPay", title: "Total Pay by Partner", data: [...freshPiePay] },
        { id: "profit", title: "Profit by Partner", data: [...freshPieProfit] },
      ];

      setData([...freshData]);
      setBarData([...freshBar]);
      setCharts([...freshCharts]);
    };
    fetchReport();
  }, [startDate, endDate, combineNoPartner]);

  const handleDateRangeChange = ([start, end, combine]) => {
    setStartDate(start);
    setEndDate(end);
    setCombineNoPartner(combine);
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
          <Typography
            variant="h4"
            display="flex"
            justifyContent={"center"}
            sx={{ m: 2 }}
          >
            Partner Job Summary for perioad{" "}
            {startDate?.format?.("YYYY-MM-DD") || startDate} →{" "}
            {endDate?.format?.("YYYY-MM-DD") || endDate}
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
            <PartnerReportTable data={data} />

            <ChartsGrid charts={charts}/>

            <Box height="50vh">
              <BarChart
                data={barData}
                keys={["Pay Received", "Contractor Cost", "Profit"]}
                indexBy="partner"
                margin={{ top: 30, right: 150, bottom: 80, left: 80 }}
                padding={0.2}
              />
            </Box>
          </Stack>
        </Box>
      </Grid>
    </LocalizationProvider>
  );
};

export default PartnersJobReport;
