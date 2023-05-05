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

const ViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  borderRadius: "4px",
  border: "1px solid blue",
}));
const ApproveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightgreen",
  borderRadius: "4px",
  border: "1px solid green",
}));
const RejectButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff7f7f",
  borderRadius: "4px",
  border: "1px solid red",
}));

// const getUsersAccountDetails = async () => {
//   const data = await makeGetReq(
//     "v1/bank-accounts?userID=1bdc3aca-76dc-47c8-8e49-c071bad768e2"
//   );
//   console.log(data);
// };
// const getUsersAccountDetails = async () => {
//   const data = await makeGetReq("v1/fiat/query-fiat-transaction");
//   console.log(data);
// };

// const approveTransaction = async () => {
//   const { data } = await makeGetReq(
//     "v1/users/00be7f4c-d485-4c8f-a911-80925202007b/kyc?userID=00be7f4c-d485-4c8f-a911-80925202007b"
//   );
//   console.log(data);
// };

export default function WithDraw() {
  const { userId: adminID } = useSessionContext();

  const [message, setMessage] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const toggleMessageModal = () => setMessageModal(!messageModal);

  const [fiatTraxns, setFiatTraxns] = useState([]);

  const [filterByKycStatus, setFilterByKycStatus] = useState("");
  const [fiatTraxnHistoryRows, setFiatTraxnHistoryRows] = useState([]);

  const [transactionHistoryModal, setTransactionHistoryModal] = useState(false);
  const toggleViewTransactionModal = () =>
    setTransactionHistoryModal(!transactionHistoryModal);

  const handleAlignment = (event, newAlignment) => {
    setFilterByKycStatus(newAlignment);
  };
  const withdrawColumns = [
    {
      field: "date",
      headerName: "Date",
      headerClassName: "kyc-column-header",
      width: 100,
    },
    {
      field: "time",
      headerName: "Time",
      headerClassName: "kyc-column-header",
      width: 200,
    },
    {
      field: "userName",
      headerName: "Username",
      headerClassName: "kyc-column-header",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      cellClassName: "kyc-row-style",
      headerClassName: "kyc-column-header",
      width: 200,
    },
    {
      field: "bankAccNo",
      cellClassName: "kyc-row-style",
      headerName: "Bank Account No",
      headerClassName: "kyc-column-header",
      width: 150,
    },
    {
      field: "withdrawAmount",
      headerName: "Withdraw Amount",
      cellClassName: "kyc-row-style",
      headerClassName: "kyc-column-header",
      width: 150,
    },
    {
      field: "RefID",
      headerName: "Reference Number",
      cellClassName: "kyc-row-style",
      headerClassName: "kyc-column-header",
      width: 200,
    },
    {
      field: "withdrawStatus",
      headerName: "Withdraw Status",
      cellClassName: "kyc-row-style",
      headerClassName: "kyc-column-header",
      widht: 200,
    },
    {
      field: "viewDetails",
      headerName: "View Details",
      headerClassName: "kyc-column-header",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <ViewButton
              onClick={async () => {
                toggleViewTransactionModal();
                await getFiatTraxnById(params.row.UserID);
              }}
            >
              Transaction History
            </ViewButton>
          </>
        );
      },
    },
    {
      field: "approve",
      headerName: "Approve",
      headerClassName: "kyc-column-header",
      width: 100,
      renderCell: (params) => {
        // console.log(params.row.RefID);
        // console.log(params.row.FiatTxnID);
        // console.log(params.row.UserID);
        return (
          <>
            <ApproveButton
              onClick={() => {
                processTraxn(
                  params.row.UserID,
                  "approve",
                  params.row.RefID,
                  params.row.FiatTxnID
                );
              }}
            >
              Approve
            </ApproveButton>
          </>
        );
      },
    },
    {
      field: "reject",
      headerName: "Reject",
      headerClassName: "kyc-column-header",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <RejectButton
              onClick={() => {
                processTraxn(
                  params.row.UserID,
                  "reject",
                  params.row.RefID,
                  params.row.FiatTxnID
                );
              }}
            >
              Reject
            </RejectButton>
          </>
        );
      },
    },
  ];

  const getListOfFiatTraxn = async () => {
    const { data } = await makeGetReq(
      "v1/fiat/query-fiat-transaction?type=INR_WITHDRAWL"
    );
    console.log(data);

    const rows = data.map((traxn) => ({
      id: traxn.id,
      userName:
        traxn.userFirstName && traxn.userLastName
          ? traxn.userFirstName + " " + traxn.userLastName
          : "---",
      depositAmount: traxn.amount,
      depositStatus: traxn.fiatTransactionStatus,
      bankAccNo: traxn.userBankAccount,
      email: traxn.userEmail,
      date: new Date(traxn.createdAt).toLocaleDateString(),
      time: new Date(traxn.createdAt).toLocaleTimeString(),
      FiatTxnID: traxn.txnID,
      RefID: traxn.txnRefID,
      UserID: traxn.userID,
    }));
    setFiatTraxns(rows);
  };
  const getFiatTraxnById = async (userId) => {
    const { data } = await makeGetReq(
      `v1/fiat/query-fiat-transaction?userID=${userId}&type=INR_WITHDRAW`
    );
    const rows = data.map((traxn) => ({
      id: traxn.id,
      userName:
        traxn.userFirstName && traxn.userLastName
          ? traxn.userFirstName + " " + traxn.userLastName
          : "---",
      email: traxn.userEmail,
      date: new Date(traxn.createdAt).toLocaleDateString(),
      time: new Date(traxn.createdAt).toLocaleTimeString(),
      depositAmount: traxn.amount,
      depositStatus: traxn.fiatTransactionStatus,
      RefID: traxn.txnRefID,
    }));
    setFiatTraxnHistoryRows(rows);
  };
  const processTraxn = async (UserID, action, RefID, FiatTxnID) => {
    try {
      const res = await makePostReq(
        `v1/fiat/transaction/${UserID}/processTransaction`,
        {
          ApproveAction: action,
          RefID,
          FiatTxnID,
          UserID,
        }
      );
      toggleMessageModal();
      setMessage(`Transaction completed with an action ${action}`);
      await getListOfFiatTraxn();
    } catch (err) {
      toggleMessageModal();
      setMessage(err.response.data.ErrorMessage);
      await getListOfFiatTraxn();
    }
  };

  useEffect(() => {
    getListOfFiatTraxn();
  }, []);
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h1">Withdraw Records</Typography>
      </Box>
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
