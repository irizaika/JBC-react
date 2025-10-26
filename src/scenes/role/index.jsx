import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole
} from "../../services/roleService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";

const Roles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const api = {
    getAll: getRoles,
    create: createRole,
    update: updateRole,
    delete: deleteRole,
  };

  const crud = useCrud(api);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "roleName", headerName: "Role Name", flex: 1 },
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
        subtitle="Managing the role list"
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
          { name: "roleName", label: "Role Name", required: true },
        ]}
        colors={colors}
        title="Role"
      />
    </>
  );
};

export default Roles;
