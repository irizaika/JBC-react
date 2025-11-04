import React from "react";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import PieChart from "../../../components/PieChart"; 

const ChartsGrid = ({ charts = []}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    <Grid container spacing={2} sx={{ mt: 2}} justifyContent={"stretch"}>
      {charts.map((c) => (
        <Grid
          item
         // key={c.id}
          size={6}
        >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: colors.grey[100], fontWeight: 600, textAlign: "center" }}
            >
              {c.title}
            </Typography>

            <Box sx={{ flex: 1, minHeight: 0 }}>
              <Box sx={{ height: "40vh", width: "100%" }}>
                <PieChart data={c.data} />
              </Box>
            </Box>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ChartsGrid;
