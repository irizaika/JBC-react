import React from "react";
import { Grid, Box, Paper, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PieChart from "../../components/PieChart"; // your ResponsivePie wrapper

const ChartsGrid = ({ charts = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid container spacing={2} sx={{ mt: 2}} justifyContent={"stretch"}>
      {charts.map((c) => (
        <Grid
          item
          key={c.id}
          size={6}
        >
          {/* <Paper
            elevation={1}
            sx={{
              height: 320,             // fixed height; ResponsivePie fills parent
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: colors.primary[400],
            }}
          > */}
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: colors.grey[100], fontWeight: 600, textAlign: "center" }}
            >
              {c.title}
            </Typography>

            <Box sx={{ flex: 1, minHeight: 0 }}>
              {/* give the chart a full-height container */}
           {/* </Box>  <Box sx={{ height: "300px", width: "300px"}}> */}

              <Box sx={{ height: "50vh", width: "100%" }}>
                <PieChart data={c.data} />
              </Box>
            </Box>
          {/* </Paper> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default ChartsGrid;
