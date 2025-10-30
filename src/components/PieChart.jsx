import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("PieChart data:", data); 

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[200] } },
          legend: { text: { fill: colors.grey[200] } },
          ticks: {
            line: { stroke: colors.grey[200], strokeWidth: 1 },
            text: { fill: colors.grey[200] },
          },
        },
        legends: { text: { fill: colors.grey[200] } },
        tooltip: {
        container: {
        background: colors.primary[400],
        color: colors.grey[100],
        fontSize: 14,
        borderRadius: 6,
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      },
    }
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      //legends={[{ anchor: 'left', direction: 'column', itemWidth: 100, itemHeight: 25, symbolSize: 20, translateX: -55, }]}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     translateY: 56,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     symbolShape: "circle",
      //   },
      // ]}
    />
  );
};

export default PieChart;
