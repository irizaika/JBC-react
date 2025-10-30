import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { isWeekend, formatPay } from "../../utils/jobComponentUtils";
import CopyAll from '@mui/icons-material/CopyAll';
import { toLookupMap } from "../../utils/mapHelper";

export default function JobCard({ job, date, colors, jobTypesList, partnersList, vanList, contractorList, onEdit, onDelete, onCopy }) {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: { xs: "100%", sm: "32%" },// three per row on sm+; 48 - two per row
        px: 1.25,
        py: 1,
        borderRadius: 1,
        backgroundColor: isWeekend(job.date)
          ? colors.sageGreen[800]
          : colors.primary[400],
        boxShadow: `0 3px 7px ${colors.primary[800]}`,
        "&:hover": { transform: "scale(1.05)", transition: "all 0.15s ease" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", pr: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: colors.burntOrange[400],
            fontSize: "0.95rem",
          }}
        >
          {jobTypesList[job.jobTypeId]} –{" "}
          {partnersList[job.partnerId] || job.customerName} –{" "}
          {formatPay(job.payReceived)}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.5 }}>
          <strong>Vans:</strong>{" "}
          {job.vans?.map((v) => vanList[v]).join(", ") || "No vans"}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.grey[300], mt: 0.25 }}>
          <strong>Contractors:</strong>{" "}
          {job.contractors
            ?.map(
              (c) => `${contractorList[c.contractorId]} (£${c.pay?.toFixed(2)})`
            )
            .join(", ") || "No contractors"}
        </Typography>
      </Box>

        <Box sx={{ top: 4, right: 4, display: "flex", gap: 0.5, }}>
            <IconButton size="small" onClick={() => onCopy(job)} sx={{ color: colors.grey[300], p: 0.5 }}>
                <CopyAll fontSize="inherit" />
            </IconButton>

            <IconButton size="small" onClick={onEdit} sx={{ color: colors.grey[300], p: 0.5 }}>
                <EditIcon fontSize="inherit" />
            </IconButton>

            <IconButton size="small" onClick={onDelete} sx={{ color: colors.burntOrange[400], p: 0.5 }}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </Box>
    </Box>
  );
}
