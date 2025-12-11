import React, { useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  useTheme
} from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';


import { ColorModeContext, tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
//import { styled } from "@mui/system";

// ✅ Validation Schema (Same style as EntityDialog)
const LoginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});


// const StyledTextField = styled(TextField)(({ theme }) => {
//   const mode = theme.palette.mode;
//   const t = tokens(mode);

//   return {
//     "& .MuiOutlinedInput-root": {
//       backgroundColor: t.primary[400],   // ✔ background GOES HERE
//       borderRadius: 8,
//       color: t.primary[300],             // text color

//       "& fieldset": {
//         borderColor: t.grey[700],        // border only
//       },

//       "&:hover fieldset": {
//         borderColor: t.grey[400],
//         borderWidth: 2,
//       },

//       "&.Mui-focused fieldset": {
//         borderColor: t.grey[100],
//         borderWidth: 2,
//       },

//       "& input": {
//         color: t.primary[300],           // ✔ visible text
//       },
//     },

//     "& .MuiInputLabel-root": {
//       color: t.primary[300],
//     },

//     "& .MuiInputLabel-root.Mui-focused": {
//       color: t.primary[300],
//     },
//   };
// });


const Login = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const t = tokens(mode);
  const colorMode = useContext(ColorModeContext);

  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {/* ───── Theme Toggle Button ───── */}
      <Box position="absolute" top={10} right={10}>
        <Button
          type="submit"
          variant="text"
          sx={{
            color: t.grey[100],
            "&:hover": {
              backgroundColor: t.grey[900],
            },
          }}
          onClick={() => navigate("/register")}>
          Create Account &nbsp;<PersonAddIcon />
        </Button>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>

      {/* ───── Login Card ───── */}
      <Paper elevation={5} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h4" mb={2} textAlign="center">
          Login
        </Typography>

        {/* ───── Formik Form ───── */}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={ async (values, { setSubmitting, setFieldError }) => {
            
            const result = await login(values.username, values.password);

            if (!result.success) {
              setFieldError("password", result.message);
             // setFieldError("password", "Invalid username or password");
              setSubmitting(false);
              return;
            }

            navigate("/");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="normal"
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],   // background GOES HERE
                    color: t.grey[200], // text color

                    "& fieldset": {
                      borderColor: t.grey[700], // border only
                    },

                    "&:hover fieldset": {
                      borderColor: t.grey[400],
                      borderWidth: 2,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: t.grey[100],
                      borderWidth: 2,
                    },

                    "& input": {
                      color: t.grey[300], // visible text
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: t.grey[400], 
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: t.grey[200],
                  },

                  /* FIX CHROME AUTOFILL */
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                    caretColor: t.grey[100],
                    borderRadius: "inherit",
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],   // background GOES HERE
                    color: t.grey[200], // text color

                    "& fieldset": {
                      borderColor: t.grey[700], // border only
                    },

                    "&:hover fieldset": {
                      borderColor: t.grey[400],
                      borderWidth: 2,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: t.grey[100],
                      borderWidth: 2,
                    },

                    "& input": {
                      color: t.grey[300], // visible text
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: t.grey[400], 
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: t.grey[200],
                  },

                  /* FIX CHROME AUTOFILL */
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                    caretColor: t.grey[100],
                    borderRadius: "inherit",
                  },
                  "& input:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                  },
                  "& input:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 100px ${t.primary[400]} inset`,
                    WebkitTextFillColor: t.grey[100],
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: t.burntOrange[700],
                  color: t.grey[100],
                  "&:hover": {
                    backgroundColor: t.burntOrange[800],
                  },
                }}
                disabled={isSubmitting}
              >
                Login &nbsp; <LoginIcon />
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
