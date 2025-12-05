import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
dayjs.locale("en-gb");

export default function DateRangeSelector({
  onChange,
  displayCombineNoPartner = true,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rangeType, setRangeType] = useState("week"); // "week" | "month" | "year"
  const [combineNoPartner, setCombineNoPartner] = useState(true);

  // ------ INITIAL RANGE (Default: current week) ------
  const getCurrentRange = (type) => {
    const today = dayjs();
    switch (type) {
      case "month":
        return [today.startOf("month"), today.endOf("month")];
      case "year":
        return [today.startOf("year"), today.endOf("year")];
      default:
        return [today.startOf("week"), today.endOf("week")];
    }
  };

  const [startDate, setStartDate] = useState(getCurrentRange("week")[0]);
  const [endDate, setEndDate] = useState(getCurrentRange("week")[1]);

  // ------ UPDATE CALLBACK ------
  const updateParent = (s, e, combined = combineNoPartner) => {
    if (onChange) onChange([s, e, combined]);
  };

  // ------ SET CURRENT RANGE (When clicking Week/Month/Year) ------
  const handleRangeSelect = (type) => {
    setRangeType(type);
    const [s, e] = getCurrentRange(type);
    setStartDate(s);
    setEndDate(e);
    updateParent(s, e);
  };

  // ------ NAVIGATION (< or >) ------
  const shiftRange = (direction) => {
    const amount = direction === "prev" ? -1 : 1;

    let newStart, newEnd;

    if (rangeType === "week") {
      newStart = startDate.add(amount, "week");
      newEnd = endDate.add(amount, "week");
    } else if (rangeType === "month") {
      newStart = startDate.add(amount, "month").startOf("month");
      newEnd = startDate.add(amount, "month").endOf("month");
    } else {
      newStart = startDate.add(amount, "year").startOf("year");
      newEnd = startDate.add(amount, "year").endOf("year");
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    updateParent(newStart, newEnd);
  };

//week, mont,year button styles
  const rangeButtonBase = {
    backgroundColor: colors.grey[800],
    color: colors.grey[100],
    fontSize: "0.7rem",
    //  fontWeight: "bold",
    textTransform: "none",
    px: 1.5,
    py: 0.5,
    "&:hover": {
      // color: colors.burntOrange[600],
      backgroundColor: colors.grey[700],
      // fontWeight: "bold",
    },
  };


const getRangeButtonStyle = (selected) => ({
  ...rangeButtonBase,
  backgroundColor: selected ? colors.grey[600] : colors.grey[800],
  color: colors.grey[100],
  "&:hover": {
    backgroundColor: selected ? colors.grey[500] : colors.grey[600],
    cursor: "pointer",
  },
  // Remove all outline / elevation
  //boxShadow: "none",
});

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="wrap"
        sx={{
          p: 2,
          mr: 1,
          borderRadius: 2,
          bgcolor: colors.primary[400],
          color: colors.grey[100],
          boxShadow: `0 2px 8px ${colors.primary[800]}`,
        }}
      >
        {/* ----- DATE PICKERS ----- */}
        <Stack direction="row" spacing={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              updateParent(newValue, endDate);
            }}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                sx: {
                  width: 160,
                  "& .MuiOutlinedInput-root input": { color: colors.grey[100] },
                },
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              updateParent(startDate, newValue);
            }}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                sx: {
                  width: 160,
                  "& .MuiOutlinedInput-root input": { color: colors.grey[100] },
                },
              },
            }}
          />
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: colors.grey[400], mx: 2 }}
        />

        {/* ----- WEEK / MONTH / YEAR SWITCH ----- */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Prev button */}
          <Button
            variant="contained"
            onClick={() => shiftRange("prev")}
            sx={{
                backgroundColor: colors.grey[800],
                color: colors.grey[100],
                fontSize: "0.7rem",
              //  fontWeight: "bold",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                "&:hover": {
                 // color: colors.burntOrange[600],
                  backgroundColor: colors.grey[700],
                 // fontWeight: "bold",
                },
            }}
          >
            {"<"}
          </Button>

          {/* Week */}
          <Button
            variant="contained"
            onClick={() => handleRangeSelect("week")}
            sx={getRangeButtonStyle(rangeType === "week")}
          >
            Week
          </Button>

          {/* Month */}
          <Button
            variant="contained"
            onClick={() => handleRangeSelect("month")}
            sx={getRangeButtonStyle(rangeType === "month")}
          >
            Month
          </Button>

          {/* Year */}
          <Button
            variant="contained"
            onClick={() => handleRangeSelect("year")}
            sx={getRangeButtonStyle(rangeType === "year")}
          >
            Year
          </Button>

          {/* Next button */}
          <Button
            variant="contained"
            onClick={() => shiftRange("next")}
            // sx={{
            //   minWidth: 40,
            //   backgroundColor: colors.primary[600],
            // }}
            sx={{
                backgroundColor: colors.grey[800],
                color: colors.grey[100],
                fontSize: "0.7rem",
              //  fontWeight: "bold",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                "&:hover": {
                 // color: colors.burntOrange[600],
                  backgroundColor: colors.grey[700],
                 // fontWeight: "bold",
                },
              }}
          >
            {">"}
          </Button>
        </Stack>

        {/* ---- Combine checkbox ---- */}
        {displayCombineNoPartner && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: colors.grey[400], mx: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={combineNoPartner}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setCombineNoPartner(val);
                    updateParent(startDate, endDate, val);
                  }}
                />
              }
              label="Combine custom jobs"
            />
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
}
