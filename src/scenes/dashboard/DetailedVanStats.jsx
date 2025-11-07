import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import axios from "axios";
import dayjs from "dayjs";
import StatGrid from "./StatGrid";

const API_URL = "https://localhost:7176/api/dashboard";

const DetailedVanStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vanStats, setVanStats] = useState([]);

  const start = dayjs().startOf("month").format("YYYY-MM-DD");
  const end = dayjs().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    const load = async () => {
      const [vansRes]= await Promise.all([
        axios.get(`${API_URL}/vans-stats`, { params: { start, end } }),
      ]);

      setVanStats(vansRes.data);

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
        {/* Vans list */}
        <Box flex={1} overflow="auto" display="flex" flexDirection="column" gap="8px">
          <Typography variant="subtitle1" sx={{ color: colors.burntOrange[500], mb: "4px" }}>
            Vans
          </Typography>
          {vanStats.map((v) => (
            <StatGrid
              key={v.id}
              title={`${(v.workPercent * 100).toFixed(0)}%`}
              subtitle={`${v.vanName} (${v.plate})`}
              progress={v.workPercent}
              increase={`${v.workedDays}/${v.totalDays} days`}
              icon={<DirectionsCarIcon sx={{ color: colors.burntOrange[600], fontSize: 20 }} />}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailedVanStats;
