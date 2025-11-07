import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({progress = "0.75", size = "40"}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);   
  const angle = progress * 360; 

  return (

    <Box 
    sx={{
        background: `radial-gradient(${colors.primary[400]} 45%, transparent 46%),
        conic-gradient(transparent 0deg ${angle}deg, ${colors.burntOrange[500]} ${angle}deg 360deg),
        ${colors.sageGreen[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        
    }}/>
        
  );
}

export default ProgressCircle;