import { ResponsiveCalendar } from '@nivo/calendar'
import { Stack, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function CalendarChart ({ data = [], startDate, endDate, isDashboard = false }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

if (!data.length || !startDate || !endDate) return null;

  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  console.log("VALUES:", values);
console.log("COLORS:", {
  c1: colors.burntOrange[300],
  c2: colors.burntOrange[500],
  c3: colors.burntOrange[800],
});

  //COLOR SCALE DYNAMIC LOGIC
  let colorScale = [];
  let legendItems = [];

if (max === 1) {
  colorScale = [colors.burntOrange[800]];
  legendItems = [{ label: "1 Job", color: colors.burntOrange[800] }];
}
else if (max === 2) {
  // Correct order: lowest value first → light -> darker
  colorScale = [colors.burntOrange[800], colors.burntOrange[600]];

  legendItems = [
    { label: "1 Job", color: colors.burntOrange[800] },
    { label: "2 Jobs", color: colors.burntOrange[600] },
  ];
}
else if (max <= 5) {
  colorScale = [
    colors.burntOrange[800], // 1
    colors.burntOrange[600], // 2
    colors.burntOrange[400]  // 3+
  ];
  legendItems = [
    { label: "1 Job", color: colors.burntOrange[800] },
    { label: "2 Jobs", color: colors.burntOrange[600] },
    { label: "3+ Jobs", color: colors.burntOrange[400] },
  ];
}
else {
  colorScale = [
    colors.burntOrange[800], // 1-2
    colors.burntOrange[600], // 3-5
    colors.burntOrange[400]  // 6+
  ];
  legendItems = [
    { label: "1–2 Jobs", color: colors.burntOrange[800] },
    { label: "3–5 Jobs", color: colors.burntOrange[600] },
    { label: "6+ Jobs", color: colors.burntOrange[400] },
  ];
}

  // DYNAMIC LEGEND COMPONENT
  const JobLegend = () => (
  <div style={{
    display: "flex",
    justifyContent: "flex-end",   // RIGHT ALIGN
    width: "100%",                 // required so justifyContent works
    gap: "16px",
    marginTop: "0px",
    paddingRight: "40px",
    fontSize: "14px"
  }}>
    {legendItems.map((item, idx) => (
      <LegendItem key={idx} color={item.color} label={item.label} />
    ))}
  </div>
  );

  const LegendItem = ({ color, label }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{
        width: 15,
        height: 15,
        background: color,
        display: "inline-block",
        borderRadius: 3
      }} />
      <span>{label}</span>
    </div>
  );


  return (
    <>
    <div style={{ width: "100%", height: "30vh", display: "block" }}>
    <ResponsiveCalendar
        data={data}
        from={startDate}
        to={endDate}
        emptyColor={colors.grey[800]}
        type="quantize"
        colors={colorScale}
        minValue={min}
        maxValue={max}
        domain={[max, min]} 
        margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
        yearSpacing={20}
        monthBorderWidth={4}
        monthBorderColor={colors.primary[400]}
        monthLegendOffset={5}
        dayBorderWidth={2}
        dayBorderColor={colors.primary[400]}
       // year month text color
        theme={{
            textColor: colors.grey[100],         // general text color
            labels: {
                text: {
                fill: colors.grey[100],          // ← month label color
                fontSize: 12,
                },
            },
            legends: {
                text: {
                fill: colors.grey[100],          // ← year label color
                },
            },
        }}
        tooltip={({ day, value, color }) => (
        <div
            style={{
            background: colors.primary[400],
            color: colors.grey[100],
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",

            }}
        >
            <strong>{day}</strong>
            <br />
            Jobs: {value}
        </div>
        )} 
        legends={[
        //   {
        //     anchor: 'top-left',
        //     direction: 'column',
        //     translateY: 36,
        //     itemWidth: 60,
        //     itemHeight: 14,
        //     itemsSpacing: 4,
        //     symbolSize: 14,
        //     symbolShape: 'square',
        //     format: (value) => { 
        //         return value.toFixed(1) // Round the value to nearest integer
        // },
            
        //   }
        ]}
        
    />
    </div>
    { isDashboard === false && <JobLegend/> }
    </>
  );
}
