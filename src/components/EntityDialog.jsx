// src/components/EntityDialog.jsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
  CircularProgress,
  MenuItem,
  Checkbox,
  Typography
} from "@mui/material";
import { Formik, Form } from "formik";
//import * as Yup from "yup";
import buildValidationSchema from "../utils/buildValidationSchema";

const EntityDialog = ({
  open,
  handleClose,
  handleSave,
  isEdit,
  loading,
  error,
  initialValues,
  fields,
  colors,
  title,
}) => {
  // Build validation schema dynamically
  // const validationSchema = Yup.object(
  //   fields.reduce((acc, field) => {
  //     let schema = Yup.string();
  //     if (field.required) {
  //       schema = schema.required(`${field.label} is required`);
  //     }
  //     acc[field.name] = schema;
  //     return acc;
  //   }, {})
  // );

  const validationSchema = buildValidationSchema(fields);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? `Edit ${title}` : `Add New ${title}`}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          await handleSave(values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <DialogContent>
              {fields.map((field) => (
                <Box key={field.name} mt={2}>
                  {field.type === "select" ? (
                    <TextField
                      select
                      fullWidth
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    >
                      {field.options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === "multiselect" ? (
                    <TextField
                      select
                      fullWidth
                      SelectProps={{
                        multiple: true,
                        renderValue: (selected) =>
                          selected
                            .map(
                              (val) =>
                                field.options.find((opt) => opt.value === val)
                                  ?.label
                            )
                            .join(", "),
                      }}
                      name={field.name}
                      label={field.label}
                      value={values[field.name] || []}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    >
                      {field.options?.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          <Checkbox
                            checked={(values[field.name] || []).includes(
                              opt.value
                            )}
                          />
                          {opt.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === "contractorPay" ? (
                    <Box>
                      {field.options.map((contractor) => (
                        <Box
                          key={contractor.value}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          mt={1}
                        >
                          <Checkbox
                            checked={values.contractorList?.some(
                              (c) => c.contractorId === contractor.value
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                values.contractorList.push({
                                  contractorId: contractor.value,
                                  pay: 0,
                                });
                              } else {
                                values.contractorList = values.contractorList.filter(
                                  (c) => c.contractorId !== contractor.value
                                );
                              }
                            }}
                          />
                          <Typography>{contractor.label}</Typography>
                          {values.contractorList?.some(
                            (c) => c.contractorId === contractor.value
                          ) && (
                            <TextField
                              label="Pay"
                              type="number"
                              size="small"
                              value={
                                values.contractorList.find(
                                  (c) => c.contractorId === contractor.value
                                )?.pay || 0
                              }
                              onChange={(e) => {
                                const selected = values.contractorList.find(
                                  (c) => c.contractorId === contractor.value
                                );
                                if (selected)
                                  selected.pay = parseFloat(e.target.value);
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  ) : field.type === "checkbox" ? (
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        name={field.name}
                        checked={Boolean(values[field.name])}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span>{field.label}</span>{" "}
                    </Box>
                  ) :  (
                    <TextField
                      fullWidth
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  )}
                </Box>
              ))}

              {error && (
                <Box color="red" mt={1}>
                  {error}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: colors.burntOrange[700],
                  color: colors.grey[100],
                  "&:hover": {
                    backgroundColor: colors.burntOrange[400],
                    color: colors.primary[900],
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EntityDialog;
