import React, { useMemo } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";

const ContractorReportTable = ({ data = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Add derived values (optional future extension)
  const enrichedData = useMemo(() => {
    return data.map((row) => ({
      ...row,
      profit: row.totalPay, // placeholder if you later add cost tracking
    }));
  }, [data]);

  // Compute summary totals
  const summary = useMemo(() => {
    if (data.length === 0) return null;

    const totalJobs = data.reduce((sum, x) => sum + x.totalJobs, 0);
    const totalPay = data.reduce((sum, x) => sum + x.totalPay, 0);
    const avgPayPerJob = totalJobs > 0 ? totalPay / totalJobs : 0;

    return {
      totalJobs,
      totalPay,
      avgPayPerJob,
    };
  }, [data]);

  return (
    <Box sx={{ p: 3 }}>
      <Table size="small" sx={{ mt: 0 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }}>
              Contractor
            </TableCell>
            <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }} align="right">
              Total Jobs
            </TableCell>
            <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }} align="right">
              Total Pay
            </TableCell>
            <TableCell sx={{ color: colors.grey[100], fontWeight: "bold" }} align="right">
              Avg Pay/Job
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {enrichedData.map((row) => (
            <TableRow key={row.contractorId}>
              <TableCell sx={{ fontWeight: "bold" }}>{row.contractorName}</TableCell>
              <TableCell align="right">{row.totalJobs}</TableCell>
              <TableCell align="right">£{row.totalPay.toFixed(2)}</TableCell>
              <TableCell align="right">£{row.averagePayPerJob.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        {summary && (
          <TableFooter>
            <TableRow
              sx={{
                borderTop: `2px solid ${colors.grey[500]}`,
                fontWeight: "bold",
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {summary.totalJobs}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                £{summary.totalPay.toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                £{summary.avgPayPerJob.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Box>
  );
};

export default ContractorReportTable;
