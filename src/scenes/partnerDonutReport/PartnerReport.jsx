import React, { useEffect, useState, useMemo } from "react";
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
import { tokens } from "../../theme";
import axios from "axios";

const PartnerReport = ({ startDate, endDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      console.log("Fetching report for dates:", startDate, endDate);
      var sd = startDate?.format?.("YYYY-MM-DD");
      var ed = endDate?.format?.("YYYY-MM-DD");
      console.log("Fetching report for dates:", sd, ed);

      const response = await axios.get(
        `https://localhost:7176/api/reports/partner-summary`,
        {
          params: { startDate: sd, endDate: ed },
        }
      );
      setData(response.data);
    };
    fetchReport();
  }, [startDate, endDate]);

  // 🧮 Compute totals and averages
  const summary = useMemo(() => {
    if (data.length === 0) return null;

    const totalJobs = data.reduce((sum, x) => sum + x.totalJobs, 0);
    const totalPay = data.reduce((sum, x) => sum + x.totalPayReceived, 0);
    const totalContractor = data.reduce((sum, x) => sum + x.totalContractorCost, 0);
    const totalProfit = totalPay - totalContractor;

    return {
      totalJobs,
      totalPay,
      totalContractor,
      totalProfit,
      avgPayPerJob: totalJobs > 0 ? totalPay / totalJobs : 0,
    };
  }, [data]);

  return (
    <Box sx={{ p: 3 }}>


      <Table size="small" sx={{ mt: 3 }}>
        <TableHead>
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell sx={{ color: colors.grey[100] }}>Partner</TableCell>
            <TableCell sx={{ color: colors.grey[100] }} align="right">
              Total Jobs
            </TableCell>
            <TableCell sx={{ color: colors.grey[100] }} align="right">
              Total Pay Received
            </TableCell>
            <TableCell sx={{ color: colors.grey[100] }} align="right">
              Total Contractor Cost
            </TableCell>
            <TableCell sx={{ color: colors.grey[100] }} align="right">
              Profit
            </TableCell>
            <TableCell sx={{ color: colors.grey[100] }} align="right">
              Avg Pay/Job
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.partnerId}>
              <TableCell>{row.partnerName}</TableCell>
              <TableCell align="right">{row.totalJobs}</TableCell>
              <TableCell align="right">
                £{row.totalPayReceived.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £{row.totalContractorCost.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £{(row.totalPayReceived - row.totalContractorCost).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £{(row.totalPayReceived / row.totalJobs).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* ✅ Summary row */}
        {summary && (
          <TableFooter>
            <TableRow sx={{ fontWeight : "bold", borderTop: `2px solid ${colors.grey[500]}` }}>
              <TableCell sx={{ fontWeight: "bold" }}>TOTAL</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {summary.totalJobs}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                £{summary.totalPay.toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                £{summary.totalContractor.toFixed(2)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                £{summary.totalProfit.toFixed(2)}
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

export default PartnerReport;
