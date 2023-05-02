/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React, { useEffect, useState } from "react";
import { makeGetReq, makePostReq } from "../utils/axiosHelper";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const withdrawColumns = [
  {
    field: "date",
    headerName: "Date",
    cellClassName: "kyc-row-style",
    headerClassName: "kyc-column-header",
  },
  {
    field: "time",
    headerName: "Time",
    cellClassName: "kyc-row-style",
    headerClassName: "kyc-column-header",
  },
  {
    field: "email",
    headerName: "Email",
    cellClassName: "kyc-row-style",
    width: 150,
    headerClassName: "kyc-column-header",
  },
  {
    field: "username",
    headerName: "Username",
    cellClassName: "kyc-row-style",
    width: 100,
    headerClassName: "kyc-column-header",
  },
  {
    field: "bankAccNo",
    headerName: "Bank Account No",
    cellClassName: "kyc-row-style",
    width: 200,
    headerClassName: "kyc-column-header",
  },
  {
    field: "isfc",
    headerName: "ISFC No",
    cellClassName: "kyc-row-style",
    width: 200,
    headerClassName: "kyc-column-header",
  },
  {
    field: "amount",
    headerName: "Amount",
    cellClassName: "kyc-row-style",
    width: 160,
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
    field: "appRej",
    headerName: "Approve/Reject",
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

// const getUsersAccountDetails = async () => {
//   const data = await makeGetReq(
//     "v1/bank-accounts?userID=1bdc3aca-76dc-47c8-8e49-c071bad768e2"
//   );
//   console.log(data);
// };
const getUsersAccountDetails = async () => {
  const data = await makeGetReq("v1/fiat/query-fiat-transaction");
  console.log(data);
};

const approveTransaction = async () => {
  const { data } = await makeGetReq(
    "v1/users/00be7f4c-d485-4c8f-a911-80925202007b/kyc?userID=00be7f4c-d485-4c8f-a911-80925202007b"
  );
  console.log(data);
};

export default function WithDraw() {
  const { userId: adminID } = useSessionContext();
  const [filterByKycStatus, setFilterByKycStatus] = useState("");
  useEffect(() => {
    getUsersAccountDetails();
    // approveTransaction();
  }, []);
  const handleAlignment = (event, newAlignment) => {
    setFilterByKycStatus(newAlignment);
  };
  return (
    <>
      <Box display="flex">
        <Box mt={1} width="55%" display="flex" justifyContent="flex-end">
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
              width: "fit-content",
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              value={filterByKycStatus}
              exclusive
              onChange={handleAlignment}
            >
              <ToggleButton value="">
                <Typography variant="h4">Default</Typography>
              </ToggleButton>
              <ToggleButton value="failed">
                <Typography variant="h4">Equitas</Typography>
              </ToggleButton>
              <ToggleButton value="in_progress">
                <Typography variant="h4">IDFC</Typography>
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Box>
        <Box mt={1} mr={2} width="45%" display="flex" justifyContent="flex-end">
          <Button variant="contained">Download</Button>
        </Box>
      </Box>

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
          rows={[]}
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
