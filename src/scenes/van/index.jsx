import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import {
  getVans,
  createVan,
  updateVan,
  deleteVan,
} from "../../services/vanService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";
import { STATUS_LABELS, STATUS_SELECT_OPTIONS } from '../../constants/statusOptions';

const Vans = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const api = {
    getAll: getVans,
    create: createVan,
    update: updateVan,
    delete: deleteVan,
  };

  const crud = useCrud(api);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "vanName", headerName: "Van Name", flex: 1 },
    { field: "details", headerName: "Details", flex: 1 },
    { field: "plate", headerName: "Plate Number", flex: 1 },
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
        title="Van"
        subtitle="Managing the van list"
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
            ? crud.rows.find((v) => v.id === crud.currentId) || { vanName: "", details: "", plate: "" }
            : { vanName: "", details: "", plate: "" }
        }
        fields={[
          { name: "vanName", label: "Van Name", required: true },
          { name: "details", label: "Details", required: false },
          { name: "plate", label: "Plate Number", required: true },
          { name: "status", label: "Status", required: false, type: "select", options: STATUS_SELECT_OPTIONS },
        ]}
        colors={colors}
        title="Van"
      />
    </>
  );
};

export default Vans;
