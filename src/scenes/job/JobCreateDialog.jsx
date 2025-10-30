import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

import { Formik, Form } from "formik";

const JobCreateDialog = ({
  open,
  handleClose,
  handleSave,
  loading,
  initialValues,
  jobTypes,
  fullJobTypes,
  partners,
  contractors,
  fullContractors,
  vans,
  colors,
}) => {



  return (
    <Dialog open={open} 
  //  onClose={handleClose} 
    onClose={(_, reason) => {
    if (reason === "backdropClick") return; // Ignore backdrop clicks
    handleClose();
  }}
    fullWidth maxWidth="md">
      <DialogTitle>Create New Job</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          await handleSave(values);
          setSubmitting(false);
        }}
      >

        {({ values, handleChange, setFieldValue }) => {
          // ✅ When job type changes, auto-fill payReceived
          const handleJobTypeChange = (e) => {
            const selectedId = e.target.value;
            handleChange(e);

            const jobType = fullJobTypes.find((j) => j.id === selectedId);
            // Auto-fill payReceived if defined
            if (jobType && jobType.payRate) {
              setFieldValue("payReceived", jobType.payRate);
            }
            else {
              setFieldValue("payReceived", 0);
            }
            // Also auto-fill partnerId if defined
            if (jobType && jobType.partnerId) {
              setFieldValue("partnerId", jobType.partnerId);
            }
            else {
              setFieldValue("partnerId", null);
            }
          };

          // ✅ When contractor changes, auto-fill contractor pay
          const handleContractorChange = (e, index) => {
            const contractorId = e.target.value;
            handleChange(e);

            const contractor = fullContractors.find((c) => c.id === contractorId);
            const jobTypeId = values.jobTypeId;

            let defaultPay = 0;

            if (contractor) {
              // Prefer rate for this job type
              if (contractor.contractorRates && contractor.contractorRates[jobTypeId]) {
                defaultPay = contractor.contractorRates[jobTypeId];
              }
              // Or fallback to base rate
              else if (contractor.roleRates && contractor.roleRates[jobTypeId]) {
                defaultPay = contractor.roleRates[jobTypeId];
              }
              else
              {
                defaultPay = 0;
              }
            }

            const updated = [...values.contractors];
          //  updated[index].pay = defaultPay;
            updated[index] = { ...updated[index], pay: defaultPay, contractorId: contractorId };
            setFieldValue("contractors", updated);
          };

          
          return (

          <Form>
            <DialogContent>
              <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2}>
                  {/* Date */}
                  <Grid item size={4}>
                    <TextField
                      fullWidth
                      label="Job Date"
                      name="date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={values.date}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Job Type */}
                  <Grid item size={4}>
                    <TextField
                      fullWidth
                      select
                      label="Job Type"
                      name="jobTypeId"
                      value={values.jobTypeId}
                      onChange={handleJobTypeChange}
                    >
                      {jobTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Count */}
                  <Grid item size={2}>
                    <TextField
                      fullWidth
                      label="Count"
                      name="count"
                      type="number"
                      value={values.count}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Pay Received */}
                  <Grid item size={2}>
                    <TextField
                      fullWidth
                      label="Pay per job"
                      name="payReceived"
                      type="number"
                      value={values.payReceived}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Partner */}
                  <Grid item size={3}>
                    <TextField
                      fullWidth
                      select
                      label={values.partnerId ? "" : "Partner"}
                      name="partnerId"
                      value={values.partnerId}
                      onChange={handleChange}
                      disabled={Boolean(values.partnerId)}
                    >
                      {partners.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Customer Name */}
                  <Grid item size={3}>
                    <TextField
                      fullWidth
                      label="Customer Name"
                      name="customerName"
                      value={values.customerName}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Details */}
                  <Grid item size={3}>
                    <TextField
                      fullWidth
                      label="Details"
                      name="details"
                      value={values.details}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Vans (Multi-select) */}
                  <Grid item size={3}>
                    <TextField
                      fullWidth
                      select
                      SelectProps={{ multiple: true }}
                      label="Vans"
                      name="vans"
                      value={values.vans || []}
                      onChange={handleChange}
                    >
                      {vans.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {/* Add contractor */}
                  <Grid item size={3}>
                    <Button
                      //variant="contained"
                      sx={{
                        color: colors.burntOrange[500],
                        borderColor: colors.burntOrange[500],
                        border: "1px solid",
                        "&:hover": {
                          backgroundColor: colors.burntOrange[500],
                          color: colors.primary[900],
                          borderColor: colors.burntOrange[500],
                        },
                      }}
                      onClick={() =>
                        setFieldValue("contractors", [
                          ...values.contractors,
                          { contractorId: "", pay: 0 },
                        ])
                      }
                    >
                      + Add Contractor
                    </Button>
                  </Grid>
                </Grid>

                {/* Contractors with Pay */}
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {values.contractors.map((contractor, index) => (
                    <Grid container size = {6} display={'flex'} key={contractor.id || index}>
                      <Grid item size={6}>
                        <TextField
                          select
                          fullWidth
                          label="Contractor"
                          name={`contractors[${index}].contractorId`}
                          value={contractor.contractorId}
                          onChange={(e) => handleContractorChange(e, index)}
                          spacing={2}
                          // sx={{ width: "50%" }}
                        >
                          {contractors.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item size={4} >
                        <TextField
                          label="Pay"
                          fullWidth
                          name={`contractors[${index}].pay`}
                          type="number"
                          value={contractor.pay}
                          onChange={handleChange}
                          spacing={2}
                          // sx={{ width: "30%" }}
                        />
                      </Grid>
                      <Grid item size={2}>
                        {/* Remove contractor */}
                        <IconButton
                          variant="outlined"
                          color="error"
                          sx={{
                            border: "1px solid rgba(255, 0, 0, 0.3)",
                            borderRadius: 1,
                            height: "54px", // same as TextField height
                            width: "100%",
                          }}
                          // fullWidth
                          //startIcon={<DeleteIcon />}
                          // sx={{ width: "50%" }}
                          // onClick={() => {
                          //   if (values.contractors.length > 1) {
                          //     const updated = values.contractors.filter(
                          //       (_, i) => i !== index
                          //     );
                          //     setFieldValue("contractors", updated);
                          //   }
                          // }}
                          onClick={() => {
                            const updated = values.contractors.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue("contractors", updated);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                disabled={loading}
                sx={{ backgroundColor: colors.burntOrange[600], color: "#fff" }}
              >
                {loading ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </DialogActions>
          </Form>
        )}
        }
      </Formik>
    </Dialog>
  );
};

export default JobCreateDialog;
