import React from "react";
import {
  Box,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import JobCard from "./JobCard";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { isWeekend } from "../../utils/jobComponentUtils";

export default function JobListLinearView({
  jobsByDate = {},
  partnersList = {},
  jobTypesList = {},
  vanList = {},
  contractorList = {},
  onCopy,
  onPaste,
  onAdd,
  onEdit,
  onDelete,
  isDashboard = false,
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


  return (
    // <Stack spacing={0.5} sx={{
    //     mt: isDashboard ? 0 : 2,
    //     maxHeight: isDashboard ? "45vh" : "75vh",
    //   overflowY: "auto",      // Enables vertical scroll
    //   overflowX: "hidden",
    //   pr: 1,                  // Avoids scrollbar overlapping content
    //  }}>

    <Stack
      spacing={0.5}
      sx={{
        mt: isDashboard ? 0 : 2,
        ...(
          isDashboard
          ? {
              // Dashboard mode — fit inside container, no scroll
              maxHeight: "unset",
              maxWidth: "inherit",
              overflow: "visible",
              height: "auto",
              p: 0,
            }
          : 
          {
              // Normal jobs page
              maxHeight: "75vh",
              overflowY: "auto",
              overflowX: "hidden",
              pr: 1,
            }),
      }}
    >
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
              backgroundColor: isDashboard
                ? colors.primary[400]
                : isWeekend(date)
                ? colors.grey[800]
                : colors.primary[400],
              boxShadow: isDashboard ? "none" : `0 1px 3px ${colors.primary[800]}`,
              color: colors.grey[100],
              borderRadius: 1,
              px: 2,
              py: 1,
            }}
          >
            {/* date header row */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Date header */}
              {!isDashboard && (
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: colors.grey[300] }}
                >
                  {date}
                </Typography>
              )}

              {/* Button group */}
              <Box>
                <IconButton
                  onClick={() => onAdd(date)}
                  sx={{ color: colors.grey[300], p: 0.5 }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={() => onPaste(date)}
                  sx={{ color: colors.grey[300], p: 0.5 }}
                >
                  <ContentPasteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* jobs grid: two per row (responsive) */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                mt: isDashboard ? 0.5 : 1,
              }}
            >
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <JobCard
                    key={`${date}-${job.id}`}
                    job={job}
                    date={date}
                    colors={colors}
                    jobTypesList={jobTypesList}
                    partnersList={partnersList}
                    vanList={vanList}
                    contractorList={contractorList}
                    onEdit={() => onEdit(job)}
                    onDelete={() => onDelete(job.id)}
                    onCopy={() => onCopy(job)}
                    isDashboard={isDashboard}
                  ></JobCard>
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
