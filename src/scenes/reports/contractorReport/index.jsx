import React, { useState, useEffect } from "react";
import { useTheme, Grid, Stack, Typography, Box } from "@mui/material";
import { tokens } from "../../../theme";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { transformContractorPartnerBarData } from "../util";
import DateRangeSelector from "../DateRangeSelector";
import BarChart from "../../../components/BarChart"
import ContractorReportTable from "./ContractorReportTable";

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const ContractorReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [combineNoPartner, setCombineNoPartner] = useState(true);
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [keysForBarData, setKeysForBarData] = useState([]);
  

  useEffect(() => {
    const fetchReport = async () => {
      const sd = startDate.format("YYYY-MM-DD");
      const ed = endDate.format("YYYY-MM-DD");
      const { data: result } = await axios.get("https://localhost:7176/api/reports/contractors", {
        params: { startDate: sd, endDate: ed, combineNoPartner },
      });

      const freshData = [...result];
      const freshBar = transformContractorPartnerBarData(freshData);

      setData([...freshData]);
      setBarData([...freshBar.barData]);
      setKeysForBarData([...freshBar.keys]);
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
            Cntractor Summary for perioad{" "}
            {startDate?.format?.("YYYY-MM-DD") || startDate} →{" "}
            {endDate?.format?.("YYYY-MM-DD") || endDate}
          </Typography>

          <Stack spacing={0.5} >

            <ContractorReportTable data={data} />

            <Box height="40vh">
              <BarChart
                data={barData}
                keys={keysForBarData}
                indexBy="Contractor" 
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

export default ContractorReport;
