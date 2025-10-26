import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "../../services/partnerService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";
import { STATUS_LABELS, STATUS_SELECT_OPTIONS } from '../../constants/statusOptions';

const Partners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const api = {
    getAll: getPartners,
    create: createPartner,
    update: updatePartner,
    delete: deletePartner,
  };

  const crud = useCrud(api);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "companyName", headerName: "Name", flex: 1 },
    { field: "shortName", headerName: "Short name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phone1", headerName: "Phone 1", flex: 1 },
    { field: "phone2", headerName: "Phone 2", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { 
      field: "status",
      headerName: "Status",
      flex: 1,
      valueFormatter: (params) => STATUS_LABELS[params] ?? "Unknown",
    },
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
        title="Partner"
        subtitle="Managing the partner list"
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
            { companyName: "", shortName: "", address: "", phone1: "", phone2: "", email: "", status: "" }
            : { companyName: "", shortName: "", address: "", phone1: "", phone2: "", email: "", status: "" }
        }
        fields={[
          { name: "companyName", label: "Name", required: true },
          { name: "shortName", label: "Short name", required: true },
          { name: "address", label: "Address", required: false },
          { name: "phone1", label: "Phone 1", required: false },
          { name: "phone2", label: "Phone 2", required: false },
          { name: "email", label: "Email", required: false },
          { name: "status", label: "Status", required: false, type: "select", options: STATUS_SELECT_OPTIONS, },
        ]}
        colors={colors}
        title="Partner"
      />
    </>
  );
};

export default Partners;
