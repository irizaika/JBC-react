// src/components/EntityTable.jsx
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";

const EntityTable = ({ title, subtitle, rows, columns, onAdd, colors }) => {
  return (
    <Box m="20px">
      {/* Header + Add Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subtitle} />
        <Button
          onClick={onAdd}
          sx={{
            backgroundColor: colors.burntOrange[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: colors.burntOrange[400],
              color: colors.primary[900],
            },
          }}
        >
          Add {title}
        </Button>
      </Box>

      {/* DataGrid */}
      <Box
        mt="20px"
        height="77vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.burntOrange[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.burntOrange[700],
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default EntityTable;
