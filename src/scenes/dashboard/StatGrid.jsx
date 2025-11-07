import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "../../components/ProgressCircle";

const StatGrid = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={colors.primary[400]}
      p="10px 12px"
      borderRadius="12px"
      minWidth="250px"
      height="55px"
      boxShadow={1}
    >
      <Box display="flex" alignItems="center" gap="10px">
        {icon}
        <Box>
          <Typography variant="body1" sx={{ color: colors.grey[100] }}>
            {subtitle}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.grey[500] }}>
            {increase}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="8px">
        <Typography variant="h6" sx={{ color: colors.sageGreen[400], fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box width="32px" height="32px">
          <ProgressCircle progress={progress} size="32" />
        </Box>
      </Box>
    </Box>
  );
};

export default StatGrid;
