import { Box, IconButton, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import React from "react";
import { tokens } from "../../theme";
import {
  getContractorRates,
  createContractorRate,
  updateContractorRate,
  deleteContractorRate
} from "../../services/contractorRatesService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EntityDialog from "../../components/EntityDialog";
import EntityTable from "../../components/EntityTable";
import { toSelectOptions, toLookupMap } from "../../utils/mapHelper";

import { useCrud } from "../../hooks/useCrud";
import { getContractors } from "../../services/contractorService";
import { getJobTypes } from "../../services/jobTypeService";

const ContractorRates = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const [contractorsFormatted, setContractorsFormatted] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [jobTypesFormatted, setJobTypesFormatted] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);

  const api = {
    getAll: getContractorRates,
    create: createContractorRate,
    update: updateContractorRate,
    delete: deleteContractorRate,
  };

  const crud = useCrud(api);


  useEffect(() => {
    // Fetch roles from backend
    const fetchContractors = async () => {
      try {
        const roles = await getContractors();
        setContractors(toLookupMap(roles, "id", "name", false));
        setContractorsFormatted(toSelectOptions(roles, "id", "name", false));
      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    };

    fetchContractors();
  }, []);

    useEffect(() => {
    // Fetch roles from backend
    const fetchCategories = async () => {
      try {
        const jobCategories = await getJobTypes();
        setJobTypes(toLookupMap(jobCategories, "id", "name", false));
        setJobTypesFormatted(toSelectOptions(jobCategories, "id", "name", false));
      } catch (error) {
        console.error("Failed to load job categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 80 },
      {
      field: "contractorId",
      headerName: "Contractor",
      flex: 1,
      valueFormatter: (params) => contractors[params] ?? "Unknown",
    },
    {
      field: "jobTypeId",
      headerName: "Job types",
      flex: 1,
      valueFormatter: (params) => jobTypes[params] ?? "Unknown",
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
        subtitle="Managing contractor pay rates per job type"
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
          { name: "contractorId", label: "Contractor", required: false, type: "select", options: contractorsFormatted },
          { name: "jobTypeId", label: "Job tyoes", required: false, type: "select", options: jobTypesFormatted },
          { name: "pay", label: "Pay Rate", required: true, type: "decimal" },
        ]}
        colors={colors}
        title="Contractor pay rates per job type"
      />
    </>
  );
};

export default ContractorRates;
