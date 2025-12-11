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

const RegisterSchema = Yup.object({
  username: Yup.string().required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required").min(6, "Min 6 chars"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password")
});

const Register = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const t = tokens(mode);
  const colorMode = useContext(ColorModeContext);

  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {/* Theme Toggle */}
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
          onClick={() => navigate("/login")}>
          Login &nbsp;<LoginIcon />
        </Button>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>

      {/* Register Card */}
      <Paper elevation={5} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h4" mb={2} textAlign="center">
          Register
        </Typography>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirm: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const result = await register(
              values.email,
              values.password,
              values.username,
            );

            if (!result.success) {
              setFieldError("email", result.message);
              setSubmitting(false);
              return;
            }

            navigate("/login");
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
              {/* Username */}
              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="normal"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],
                    "& input": { color: t.grey[300] },
                  },
                  "& .MuiInputLabel-root": {
                    color: t.grey[400],
                  },
                }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],
                    "& input": { color: t.grey[300] },
                  },
                  "& .MuiInputLabel-root": {
                    color: t.grey[400],
                  },
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],
                    "& input": { color: t.grey[300] },
                  },
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirm"
                margin="normal"
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirm && Boolean(errors.confirm)}
                helperText={touched.confirm && errors.confirm}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: t.primary[400],
                    "& input": { color: t.grey[300] },
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
                  "&:hover": { backgroundColor: t.burntOrange[800] },
                }}
                disabled={isSubmitting}
              >
                Create Account &nbsp; <PersonAddIcon />
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Register;
