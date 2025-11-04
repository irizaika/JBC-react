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
import { tokens } from "../../../theme";

const PartnerReportTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Compute totals & profits
  const enrichedData = useMemo(() => {
    return (data || []).map((row) => ({
      ...row,
      profit: row.totalPayReceived - row.totalContractorCost,
    }));
  }, [data]);

  // // Sort for highlighting top 3 profits
  // const top3ByProfitIds = useMemo(() => {
  //   const sorted = [...enrichedData].sort((a, b) => b.profit - a.profit);
  //   return sorted.slice(0, 3).map((r) => r.partnerId);
  // }, [enrichedData]);

  // Summary row
  const summary = useMemo(() => {
    if (data.length === 0) return null;

    const totalJobs = data.reduce((sum, x) => sum + x.totalJobs, 0);
    const totalPay = data.reduce((sum, x) => sum + x.totalPayReceived, 0);
    const totalContractor = data.reduce(
      (sum, x) => sum + x.totalContractorCost,
      0
    );
    const totalProfit = totalPay - totalContractor;

    return {
      totalJobs,
      totalPay,
      totalContractor,
      totalProfit,
      avgPayPerJob: totalJobs > 0 ? totalPay / totalJobs : 0,
    };
  }, [data]);

  const getRowColor = (row) => {
    // const name = row.partnerName?.toLowerCase() ?? "";
    // if (name.includes("unassigned")) {
    //   return colors.burntOrange[800];
    // }

    // if (top3ByProfitIds.includes(row.partnerId)) {
    //   const rank = top3ByProfitIds.indexOf(row.partnerId);
    //   switch (rank) {
    //     case 0:
    //       return theme.palette.mode === "dark"
    //         ? "#1b5e20"
    //         : "#a5d6a7"; // dark or light green
    //     case 1:
    //       return theme.palette.mode === "dark"
    //         ? "#f9a825"
    //         : "#fff59d"; // gold/yellow
    //     case 2:
    //       return theme.palette.mode === "dark"
    //         ? "#ef6c00"
    //         : "#ffcc80"; // orange
    //     default:
    //       return "inherit";
    //   }
    // }

    return "inherit";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Table size="small" sx={{ mt: 0}}>
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
          {enrichedData.map((row) => (
            <TableRow
              key={`${row.partnerId}-${row.partnerName}`}
              // sx={{
              //   backgroundColor: getRowColor(row),
              //   "&:nth-of-type(odd)": {
              //     backgroundColor:
              //       getRowColor(row) === "inherit"
              //         ? colors.primary[500]
              //         : getRowColor(row),
              //   },
              // }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>
                {row.partnerName}
              </TableCell>
              <TableCell align="right">{row.totalJobs}</TableCell>
              <TableCell align="right">
                £{row.totalPayReceived.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £{row.totalContractorCost.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £{row.profit.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                £
                {row.totalJobs > 0
                  ? (row.totalPayReceived / row.totalJobs).toFixed(2)
                  : "0.00"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {summary && (
          <TableFooter>
            <TableRow
              sx={{
                fontWeight: "bold",
                borderTop: `2px solid ${colors.grey[500]}`,
                borderBottom: `0px`,
              //  backgroundColor: colors.primary[600],
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

export default PartnerReportTable;
