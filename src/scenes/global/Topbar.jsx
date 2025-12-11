import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext/*, tokens*/ } from "../../theme";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
 // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end" // Align content to the right
      alignItems="center"
      p={0}
    >
      {/* Toggle Button */}
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      {/* Logout button */}
      <IconButton onClick={handleLogout} title="Logout">
        <Logout />
      </IconButton>
    </Box>
  );
};

export default Topbar;
