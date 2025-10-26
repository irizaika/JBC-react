import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
dayjs.locale("en-gb"); // UK locale, week starts on Monday

const shortcutsItems = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(1, "week");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const nextMonth = today.add(1, "month");
      return [nextMonth.startOf("month"), nextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

export default function DateRangeSelector({ onChange }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());

  const handleShortcutClick = (getValue) => {
    const [start, end] = getValue();
    setStartDate(start);
    setEndDate(end);
    if (onChange) onChange([start, end]);
  };

  const handleStartChange = (newValue) => {
    setStartDate(newValue);
    if (onChange) onChange([newValue, endDate]);
  };

  const handleEndChange = (newValue) => {
    setEndDate(newValue);
    if (onChange) onChange([startDate, newValue]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
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
        {/* --- Date Pickers --- */}
        <Stack direction="row" spacing={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartChange}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                sx: {
                  width: 160,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.sageGreen[400]
                    },
                    "&:hover fieldset": {
                      borderColor: colors.sageGreen[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.burntOrange[400],
                    },
                    input: {
                      color: colors.grey[100]
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300]
                  },
                  "& .MuiSvgIcon-root": {
                    color: colors.grey[100]
                  },
                },
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndChange}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                sx: {
                  width: 160,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.sageGreen[400]
                    },
                    "&:hover fieldset": {
                      borderColor: colors.sageGreen[500],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.burntOrange[400],
                    },
                    input: {
                      color: colors.grey[100]
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.grey[300]
                  },
                  "& .MuiSvgIcon-root": {
                    color: colors.grey[100]
                  },
                },
              },
            }}
          />
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: colors.grey[400], mx: 1 }}
        />

        {/* --- Shortcut Buttons --- */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {shortcutsItems.map((item) => (
            <Button
              key={item.label}
              variant="contained"
              onClick={() => handleShortcutClick(item.getValue)}
              sx={{
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                fontSize: "0.7rem",
              //  fontWeight: "bold",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                "&:hover": {
              //    backgroundColor: colors.primary[400],
                  color: colors.burntOrange[500],
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
