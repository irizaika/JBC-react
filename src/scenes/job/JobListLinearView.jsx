import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function JobListLinearView({
  jobsByDate = {},
  partnersList = {},
  jobTypesList = {},
  vanList = {},
  contractorList = {},
  onAdd,
  onEdit,
  onDelete,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Ensure we have an object where each key -> array
  const dateKeys = Object.keys(jobsByDate || {}).sort();

  if (dateKeys.length === 0) {
    return (
      <Typography
        variant="h6"
        color={colors.grey[400]}
        sx={{ mx: "auto", mt: 4 }}
      >
        No jobs found in this date range.
      </Typography>
    );
  }

  const isWeekend = (dateOrString) => {
    const d = new Date(dateOrString);
    return [0, 6].includes(d.getDay());
  };

  return (
    <Stack spacing={0.5} sx={{ mt: 2,
      maxHeight: "75vh",      // Or "100vh" if you want full screen height
      overflowY: "auto",      // Enables vertical scroll
      overflowX: "hidden",
      pr: 1,                  // Avoids scrollbar overlapping content
     }}>
      {dateKeys.map((date) => {
        // normalize jobs array
        const rawJobs = Array.isArray(jobsByDate[date]) ? jobsByDate[date] : [];

        // Deduplicate by id (keeps first occurrence)
        const jobsMap = new Map();
        rawJobs.forEach((j) => {
          if (j && j.id != null) {
            jobsMap.set(j.id, j);
          }
        });
        const jobs = Array.from(jobsMap.values());

        return (
          <Box
            key={date}
            
            sx={{
              backgroundColor: isWeekend(date)
                ? colors.sageGreen[800]
                : colors.primary[400],
              boxShadow: `0 1px 3px ${colors.primary[800]}`,
              color: colors.grey[100],
              borderRadius: 1,
              px: 2,
              py: 1,
              
            }}
          >
            {/* date header row */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography
                variant="h4"
                sx={{
                  minWidth: 80,
                  fontWeight: "bold",
                  color: colors.sageGreen[500],
                }}
              >
                {date}
              </Typography>

              <Button
                size="small"
                startIcon={<AddIcon fontSize="small" />}
                onClick={() => onAdd(date)}
                sx={{
                  color: colors.burntOrange[500],
                  borderColor: colors.burntOrange[500],
                  border: "1px solid",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: colors.burntOrange[500],
                    color: colors.primary[900],
                  },
                }}
              >
                Add
              </Button>
            </Box>

            {/* jobs grid: two per row (responsive) */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                mt: 1,
              }}
            >
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <Box
                    key={`${date}-${job.id}`}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: { xs: "100%", sm: "32%" }, // two per row on sm+
                      px: 1.25,
                      py: 1,
                      borderRadius: 1,
                      backgroundColor: isWeekend(job.date)
                        ? colors.sageGreen[800]
                        : colors.primary[400],
                      boxShadow: `0 3px 7px ${colors.primary[800]}`,
                      "&:hover": {
                        // boxShadow: `0 3px 7px ${
                        // isWeekend(job.date)
                        // ? colors.sageGreen[100] // Weekend color
                        // : colors.primary[900] // Normal weekday color
                        // }`,
                        transform: "scale(1.05)",
                        transition: "all 0.15s ease",
                      }
                    }}
                  >
                    {/* LEFT: job info */}
                    <Box sx={{ display: "flex", flexDirection: "column", pr: 1 }}>
                      <Typography sx={{ fontWeight: "700", color: colors.burntOrange[400], fontSize: "0.95rem" }}>
                        {job.jobTypeId != null ? jobTypesList[job.jobTypeId] : "Job type"}{" "}
                        –{" "}
                        {job.partnerId != null ? partnersList[job.partnerId] : job.customerName || "No customer"}{" "}
                        –{" "}£{job.payReceived != null ? job.payReceived.toFixed(2) : "0.00"}
                      </Typography>

                      <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.5 }}>
                        <strong>Vans:</strong>{" "}
                        {Array.isArray(job.vans) ? (job.vans.map(v => vanList[v]).filter(Boolean).join(", ") || "No vans") : "No vans"}
                      </Typography>

                      <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.25 }}>
                        <strong>Contractors:</strong>{" "}
                        {Array.isArray(job.contractors)
                          ? job.contractors.map(c => (typeof c === "object" ? contractorList[c.contractorId] + " (£" + (c.pay!=null ? c.pay.toFixed(2) : "0.00") + ")" : contractorList[c])).filter(Boolean).join(", ") || "No contractors"
                          : "No contractors"}
                      </Typography>
                    </Box>

                    {/* RIGHT: icon-only vertical buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "center" }}>
                      <IconButton size="small" onClick={() => onEdit(job)} sx={{ border: `1px solid ${colors.grey[700]}`, color: colors.grey[100] }}>
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton size="small" onClick={() => onDelete(job.id)} sx={{ border: `1px solid ${colors.burntOrange[700]}`, color: colors.burntOrange[400] }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color={colors.grey[500]}>
                  No jobs
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
