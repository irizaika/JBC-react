import { Box, IconButton, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import { tokens } from "../../theme";
import {
  getJobTypes,
  createJobType,
  updateJobType,
  deleteJobType,
} from "../../services/jobTypeService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";
import { getPartners } from "../../services/partnerService";
import { toSelectOptions, toLookupMap } from "../../utils/mapHelper";
import { getJobCategories } from "../../services/jobCategoryService";

const JobTypes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [partnersFormatted, setPartnersFormatted] = useState([]);
  const [partners, setPartners] = useState([]);
  const [jobCategoriesFormatted, setJobCategoriesFormatted] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  const api = {
    getAll: getJobTypes,
    create: createJobType,
    update: updateJobType,
    delete: deleteJobType,
  };

  const crud = useCrud(api);

  useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const partners = await getPartners();
        setPartners(toLookupMap(partners, "id", "companyName"));
        setPartnersFormatted(toSelectOptions(partners, "id", "companyName"));
      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    };

    fetchRoles();
  }, []);

    useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const jobCategories = await getJobCategories();
        setJobCategories(toLookupMap(jobCategories, "id", "name"));
        setJobCategoriesFormatted(toSelectOptions(jobCategories, "id", "name"));
      } catch (error) {
        console.error("Failed to load job categories:", error);
      }
    };

    fetchRoles();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
      {
      field: "jobCategoryId",
      headerName: "Job category",
      flex: 1,
      valueFormatter: (params) => jobCategories[params] ?? "Unknown",
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "numberOfPeople", headerName: "Number of people", flex: 1 },
    { field: "numberOfVans", headerName: "Number of vans", flex: 1 },
    {
      field: "partnerId",
      headerName: "Partner",
      flex: 1,
      valueFormatter: (params) => partners[params] ?? "Unknown",
    },
    { field: "payRate", headerName: "Pay rate", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => crud.handleOpenEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => crud.handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <EntityTable
        title="Job types"
        subtitle="Managing job types"
        rows={crud.rows}
        columns={columns}
        onAdd={crud.handleOpenAdd}
        colors={colors}
      />
      {/* Add/Edit Dialog */}
      <EntityDialog
        open={crud.open}
        handleClose={crud.handleClose}
        handleSave={crud.handleSave}
        isEdit={crud.isEdit}
        loading={crud.loading}
        error={crud.error}
        initialValues={
          crud.isEdit
            ? crud.rows.find((v) => v.id === crud.currentId) || 
            { name: "", description: "", jobCategory :null, numberOfPeople: 0, numberOfVans:0, partnerId: null, payRate: 0.0}
            : { name: "", description: "", jobCategory :null, numberOfPeople: 0, numberOfVans:0, partnerId: null, payRate: 0.0}
        }
        fields={[
            { name: "name", label: "Job Name", required: true },
            { name: "description", label: "Description", required: false },
            { name: "jobCategoryId", label: "Job category", required: false, type: "select", options: jobCategoriesFormatted },
            { name: "numberOfPeople", label: "Number of people", required: true, type: "number" },
            { name: "numberOfVans", label: "Number of vans", required: true, type: "number" },
            { name: "partnerId", label: "Partner", required: false, type: "select", options: partnersFormatted },
            { name: "payRate", label: "Pay Rate", required: true, type: "decimal" },
        ]}
        colors={colors}
        title="Van"
      />
    </>
  );
};

export default JobTypes;
