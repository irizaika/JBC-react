import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#F5F4F2",
          200: "#E0DED9",
          300: "#CCC9C3",
          400: "#B8B8B5",
          500: "#A5A29C",
          600: "#8E8B87",
          700: "#73706C",
          800: "#5A5855",
          900: "#3E3C39",
        },
        primary: {
          100: "#4B4F54",
          200: "#3B4046",
          300: "#2C2F33",
          400: "#1D1F21",
          500: "#141516", // very dark
          600: "#0F1012",
          700: "#0A0A0B",
          800: "#060606",
          900: "#020202",
        },
        woodBrown: {
          100: "#EACFBF",
          200: "#D6B79F",
          300: "#C29E7F",
          400: "#AE8660",
          500: "#9A6E40",  // main wood
          600: "#7C5833",
          700: "#5E4127",
          800: "#402B1A",
          900: "#20150D",
        },
        burntOrange: {
          100: "#FFD9B3",
          200: "#FFC088",
          300: "#FFA55D",
          400: "#FF8A33",
          500: "#FF6F09",
          600: "#CC5907",
          700: "#994406",
          800: "#662D04",
          900: "#331702",
        },
        sageGreen: {
          100: "#D9E2D8",
          200: "#B3C5B1",
          300: "#8EA98B",
          400: "#688F65",
          500: "#41844F",
          600: "#356E3F",
          700: "#28572F",
          800: "#1B3F20",
          900: "#0D1F10",
        },
      }
    : {
        // light mode version: invert etc
        grey: {
          100: "#3E3C39",
          200: "#5A5855",
          300: "#73706C",
          400: "#8E8B87",
          500: "#A5A29C",
          600: "#B8B8B5",
          700: "#CCC9C3",
          800: "#E0DED9",
          900: "#F5F4F2",
        },
        primary: {
          100: "#141516",
          200: "#1D1F21",
          300: "#2C2F33",
          400: "#f2f0f0",
          500: "#4B4F54",
          600: "#5E6268",
          700: "#7D8288",
          800: "#9C9FA4",
          900: "#BBBDBF",
        },
        woodBrown: {
          100: "#20150D",
          200: "#402B1A",
          300: "#5E4127",
          400: "#7C5833",
          500: "#9A6E40",
          600: "#AE8660",
          700: "#C29E7F",
          800: "#D6B79F",
          900: "#EACFBF",
        },
        burntOrange: {
          100: "#331702",
          200: "#662D04",
          300: "#994406",
          400: "#CC5907",
          500: "#FF6F09",
          600: "#FF8A33",
          700: "#FFA55D",
          800: "#FFC088",
          900: "#FFD9B3",
        },
        sageGreen: {
          100: "#0D1F10",
          200: "#1B3F20",
          300: "#28572F",
          400: "#356E3F",
          500: "#41844F",
          600: "#688F65",
          700: "#8EA98B",
          800: "#B3C5B1",
          900: "#D9E2D8",
        },
      }),
});


export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.sageGreen[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.sageGreen[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
        h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      }
    }
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});


export const useMode = () => {
  const [mode, setMode] = useState("dark"); 
    const colorMode = useMemo( 
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};