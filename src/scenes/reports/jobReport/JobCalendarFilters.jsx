import React from "react";
import { Box, Stack, Autocomplete, TextField, useTheme, Grid } from "@mui/material";
import { tokens } from "../../../theme";

export default function JobCalendarFilters({
  vans,
  contractors,
  partners,
  jobTypes,
  selectedVan,
  setSelectedVan,
  selectedContractor,
  setSelectedContractor,
  selectedPartner,
  setSelectedPartner,
  selectedJobType,
  setSelectedJobType,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <Box
        display="flex"
        alignItems="right"
        justifyContent="flex-end"
        flexWrap="wrap"
        // gap={2}
        sx={{
          p: 2,
          mr: 1, // space from right edge works better than gap here
          borderRadius: 2,
          bgcolor: colors.primary[400],
          color: colors.grey[100],
          boxShadow: `0 2px 8px ${colors.primary[800]}`,
        }}
    >
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Autocomplete
          options={vans}
          getOptionLabel={(o) => o.vanName}
          value={selectedVan}
          onChange={(e, val) => setSelectedVan(val)}
          renderInput={(params) => <TextField {...params} label="Van" />}
          sx={{ width: 200 }}
        />
        <Autocomplete
          options={contractors}
          getOptionLabel={(o) => o.name}
          value={selectedContractor}
          onChange={(e, val) => setSelectedContractor(val)}
          renderInput={(params) => <TextField {...params} label="Contractor" />}
          sx={{ width: 200 }}
        />
        <Autocomplete
          options={partners}
          getOptionLabel={(o) => o.companyName}
          value={selectedPartner}
          onChange={(e, val) => setSelectedPartner(val)}
          renderInput={(params) => <TextField {...params} label="Partner" />}
          sx={{ width: 200 }}
        />
        <Autocomplete
          options={jobTypes}
          getOptionLabel={(o) => o.name}
          value={selectedJobType}
          onChange={(e, val) => setSelectedJobType(val)}
          renderInput={(params) => <TextField {...params} label="Job Type" />}
          sx={{ width: 200 }}
        />
      </Stack>
    </Box>
  );
}
