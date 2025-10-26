import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import {
  getJobCategories,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory
} from "../../services/jobCategoryService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";

const JobCategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const api = {
    getAll: getJobCategories,
    create: createJobCategory,
    update: updateJobCategory,
    delete: deleteJobCategory,
  };

  const crud = useCrud(api);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Job Category Name", flex: 1 },
    { field: "hours", headerName: "Hours", flex: 1 },
    { field: "isCustom", headerName: "Custom", flex: 1 },
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
        title="Job Categories"
        subtitle="Managing the job category list"
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
          crud.isEdit ? crud.rows.find((v) => v.id === crud.currentId) || { name: "", hours: 0, isCustom: false }
          : { name: "", hours: 0, isCustom: false }
        }
        fields={[
          { name: "name", label: "JobCategory Name", required: true },
          { name: "hours", label: "Hours", required: false, type: "decimal" },
          { name: "isCustom", label: "Is custom", required: false, type: "checkbox" },
        ]}
        colors={colors}
        title="JobCategory"
      />
    </>
  );
};

export default JobCategories;
