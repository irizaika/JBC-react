import { Box, IconButton, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import { tokens } from "../../theme";
import {
  getContractors,
  createContractor,
  updateContractor,
  deleteContractor,
 // getStatuses,
} from "../../services/contractorService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";

import { useCrud } from "../../hooks/useCrud";
import { STATUS_LABELS, STATUS_SELECT_OPTIONS } from '../../constants/statusOptions';
import { getRoles } from "../../services/roleService";

const Contractors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [roleOptionsFormatted, setRoleOptionsFormatted] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const api = {
    getAll: getContractors,
    create: createContractor,
    update: updateContractor,
    delete: deleteContractor,
  };

  const crud = useCrud(api);

  useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const roles = await getRoles();
        // Transform to dropdown format
        const formatted = roles.map((r) => ({
          value: r.id,
          label: r.roleName,
        }));

        const roleList = roles.reduce((acc, r) => {
          acc[r.id] = r.roleName;
          return acc;
        }, {});

        setRoleOptions(roleList);
        setRoleOptionsFormatted(formatted);
      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1,  },
    { field: "shortName", headerName: "Short name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phone1", headerName: "Phone 1", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bankAccount", headerName: "Bank Account", flex: 1 },
    { field: "dayRate", headerName: "Day rate", flex: 1 },
    {
      field: "roleId",
      headerName: "Role",
      flex: 1,
      valueFormatter: (params) => roleOptions[params] ?? "Unknown",
    },
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
        title="Contractor"
        subtitle="Managing the contractor list"
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
            ? crud.rows.find((v) => v.id === crud.currentId) || {
                name: "",
                shortName: "",
                address: "",
                phone1: "",
                email: "",
                bankAccount: "",
                status: -1,
                dayRate: 0.0,
                roleId: 0,
              }
            : {
                name: "",
                shortName: "",
                address: "",
                phone1: "",
                email: "",
                bankAccount: "",
                status: -1,
                dayRate: 0.0,
                roleId: 0,
              }
        }
        fields={[
          { name: "name", label: "Name", required: true, type: "text" },
          {
            name: "shortName",
            label: "Short name",
            required: true,
            type: "text",
          },
          { name: "address", label: "Address", required: false, type: "text" },
          { name: "phone1", label: "Phone 1", required: false, type: "text" },
          { name: "email", label: "Email", required: false, type: "text" },
          {
            name: "bankAccount",
            label: "Bank Account",
            required: false,
            type: "text",
          },
          {
            name: "dayRate",
            label: "Day rate",
            frequired: false,
            type: "decimal",
          },
          {
            name: "roleId",
            label: "Role",
            required: false,
            type: "select",
            options: roleOptionsFormatted,
          },
          {
            name: "status",
            label: "Status",
            required: false,
            type: "select",
            options: STATUS_SELECT_OPTIONS,
          },
        ]}
        colors={colors}
        title="Contractor"
      />
    </>
  );
};

export default Contractors;
