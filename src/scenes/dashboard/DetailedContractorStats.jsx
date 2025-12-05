import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HandymanIcon from "@mui/icons-material/Handyman";
import axios from "axios";
import dayjs from "dayjs";
import StatGrid from "./StatGrid";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/dashboard`;

const DetailedContractorStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contractorStats, setContractorStats] = useState([]);

  const start = dayjs().startOf("month").format("YYYY-MM-DD");
  const end = dayjs().endOf("month").format("YYYY-MM-DD");
  const monthName = dayjs().startOf("month").format("MMMM");

  useEffect(() => {
    const load = async () => {
      const [contractorsRes] = await Promise.all([
        axios.get(`${API_URL}/contractors-stats`, { params: { start, end } }),
      ]);

      setContractorStats(contractorsRes.data);
    };

    load();
  }, []);

  return (
    <Box
      gridColumn="span 3"
      gridRow="span 3"
      backgroundColor={colors.primary[400]}
      p="15px"
      borderRadius="12px"
      display="flex"
      flexDirection="column"
      gap="15px"
      height="100%"
      overflow="hidden"
    >
      {/* <Typography variant="h5" color={colors.grey[100]}>
        Van & Contractor Stats (This Month)
      </Typography> */}

      <Box display="flex" gap="10px" height="100%">
        {/* Contractors list */}
        <Box flex={1} overflow="auto" display="flex" flexDirection="column" gap="8px">
          <Typography variant="subtitle1" sx={{ color: colors.burntOrange[500], mb: "4px" }}>
            Contractors  stats in {monthName}
          </Typography>
          {contractorStats.map((c) => (
            <StatGrid
              key={c.id}
              title={`${(c.workPercent * 100).toFixed(0)}%`}
              subtitle={c.name}
              progress={c.workPercent}
              increase={`${c.workedDays}/${c.totalDays} days`}
              icon={<HandymanIcon sx={{ color: colors.burntOrange[600], fontSize: 20 }} />}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedContractorStats;
