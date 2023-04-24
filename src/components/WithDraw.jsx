/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";

const ShowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  borderRadius: "4px",
  border: "1px solid blue",
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFFF00",
  borderRadius: "4px",
  border: "1px solid #757500",
}));

const withdrawColumns = [
  {
    field: "userName",
    headerName: "Username",
    cellClassName: "kyc-row-style",
    headerClassName: "kyc-column-header",
  },
  {
    field: "status",
    headerName: "Status",
    cellClassName: "kyc-row-style",
    width: 100,
    headerClassName: "kyc-column-header",
  },
  {
    field: "amount",
    headerName: "Requested amount",
    cellClassName: "kyc-row-style",
    width: 150,
    headerClassName: "kyc-column-header",
  },
  {
    field: "date",
    headerName: "Datetime",
    cellClassName: "kyc-row-style",
    width: 200,
    headerClassName: "kyc-column-header",
  },
  {
    field: "transHistory",
    headerName: "Transaction history",
    width: 200,
    headerClassName: "kyc-column-header",
    renderCell: (params) => {
      return (
        <>
          <ShowButton>Transaction History</ShowButton>
        </>
      );
    },
  },
  {
    field: "download",
    headerName: "Download",
    width: 150,
    headerClassName: "kyc-column-header",
    renderCell: (params) => {
      return (
        <>
          <DownloadButton endIcon={<DownloadIcon />}>Download</DownloadButton>
        </>
      );
    },
  },
];

const withdrawRows = [
  {
    id: 1,
    userName: "Jon Snow",
    status: "failed",
    amount: "$440",
    date: `${new Date().toLocaleString()}`,
  },
  {
    id: 2,
    userName: "Jon Snow",
    status: "failed",
    amount: "$440",
    date: `${new Date().toLocaleString()}`,
  },
  {
    id: 3,
    userName: "Jon Snow",
    status: "failed",
    amount: "$440",
    date: `${new Date().toLocaleString()}`,
  },
  {
    id: 4,
    userName: "Jon Snow",
    status: "failed",
    amount: "$440",
    date: `${new Date().toLocaleString()}`,
  },
];

export default function WithDraw() {
  return (
    <>
      <Box sx={{ p: 2, height: 650, width: "100%" }}>
        <DataGrid
          sx={{
            ".MuiDataGrid-columnHeaderCheckbox": {
              display: "none",
            },
            "& .MuiDataGrid-cellCheckbox": {
              display: "none",
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          rows={withdrawRows}
          columns={withdrawColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
