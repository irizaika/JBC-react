import { Box, IconButton, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import React from "react";
import { tokens } from "../../theme";
import {
  getRoleRates,
  createRoleRate,
  updateRoleRate,
  deleteRoleRate
} from "../../services/roleRatesService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";
import { getJobCategories } from "../../services/jobCategoryService";
import { toSelectOptions, toLookupMap } from "../../utils/mapHelper";
import { getRoles } from "../../services/roleService";

import { useCrud } from "../../hooks/useCrud";

const RoleRates = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const [rolesFormatted, setRolesFormatted] = useState([]);
    const [roles, setRoles] = useState([]);
    const [jobCategoriesFormatted, setJobCategoriesFormatted] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);

  const api = {
    getAll: getRoleRates,
    create: createRoleRate,
    update: updateRoleRate,
    delete: deleteRoleRate,
  };

  const crud = useCrud(api);


  useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const roles = await getRoles();
        setRoles(toLookupMap(roles, "id", "roleName", false));
        setRolesFormatted(toSelectOptions(roles, "id", "roleName", false));
      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    };

    fetchRoles();
  }, []);

    useEffect(() => {
    // Fetch roles from backend
    const fetchCategories = async () => {
      try {
        const jobCategories = await getJobCategories();
        setJobCategories(toLookupMap(jobCategories, "id", "name", false));
        setJobCategoriesFormatted(toSelectOptions(jobCategories, "id", "name", false));
      } catch (error) {
        console.error("Failed to load job categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 80 },
      {
      field: "roleId",
      headerName: "Role",
      flex: 1,
      valueFormatter: (params) => roles[params] ?? "Unknown",
    },
    {
      field: "jobCategoryId",
      headerName: "Job category",
      flex: 1,
      valueFormatter: (params) => jobCategories[params] ?? "Unknown",
    },
    { field: "pay", headerName: "Pay rate", flex: 1 },
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
        title="Roles"
        subtitle="Managing the default pay rates per roles"
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
          crud.isEdit ? crud.rows.find((v) => v.id === crud.currentId) || { roleName: "" }: { roleName: "" }
        }
        fields={[
          { name: "roleId", label: "Role", required: false, type: "select", options: rolesFormatted },
          { name: "jobCategoryId", label: "Job category", required: false, type: "select", options: jobCategoriesFormatted },
          { name: "pay", label: "Pay Rate", required: true, type: "decimal" },
        ]}
        colors={colors}
        title="Default pay rate per role"
      />
    </>
  );
};

export default RoleRates;
