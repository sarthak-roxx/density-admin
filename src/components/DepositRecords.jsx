/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
// import axiosInstance from "../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/kyc/users.slice";
import { makeGetReq, makePatchReq, makePostReq } from "../utils/axiosHelper";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const messageModalStyles = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "20%",
  bgcolor: "#101010",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function DepositRecords() {
  const dispatch = useDispatch();
  const { userId: adminID } = useSessionContext();

  const [remark, setRemark] = useState("");

  const [remarkModal, setRemarkModal] = useState(false);
  const toggleRemarkModal = () => setRemarkModal(!remarkModal);

  const [message, setMessage] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const toggleMessageModal = () => setMessageModal(!messageModal);

  const [fiatTraxnHistoryRows, setFiatTraxnHistoryRows] = useState([]);

  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);

  const [fiatTraxns, setFiatTraxns] = useState([]);
  const [transactionHistoryModal, setTransactionHistoryModal] = useState(false);
  const toggleViewTransactionModal = () =>
    setTransactionHistoryModal(!transactionHistoryModal);

  const depositLogs = [
    {
      field: "timestamp",
      headerClassName: "kyc-column-header",
      headerName: "Timestamp",
      width: 200,
    },
    {
      field: "action",
      headerClassName: "kyc-column-header",
      headerName: "Action",
      width: 200,
    },
    {
      field: "admin",
      headerClassName: "kyc-column-header",
      headerName: "Admin",
      width: 200,
    },
  ];

  const columns = [
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
      field: "depositAmount",
      headerName: "Deposit Amount",
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
      field: "depositStatus",
      headerName: "Deposit Status",
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

  const transactionRows = [
    {
      id: 1,
      date: "24/01/2022",
      time: "1:33:18PM",
      amount: "-0.8774",
      transactionType: "USDT BUY",
      status: "verified",
      referenceId: "1f78669f-27b0-4430-8303",
    },
    {
      id: 2,
      date: "15/03/2022",
      time: "12:33:18PM",
      amount: "-0.8774",
      transactionType: "USDT SELL",
      status: "verified",
      referenceId: "1f78669f-27b0-4430-8303",
    },
    {
      id: 3,
      date: "14/11/2022",
      time: "4:18:18PM",
      amount: "-0.8774",
      transactionType: "INR DEPOSIT",
      status: "verified",
      referenceId: "1f78669f-27b0-4430-8303",
    },
    {
      id: 4,
      date: "14/08/2022",
      time: "09:18:18PM",
      amount: "-0.8774",
      transactionType: "USDT BUY",
      status: "verified",
      referenceId: "1f78669f-27b0-4430-8303",
    },
  ];
  const transactionColumns = [
    {
      field: "date",
      headerClassName: "kyc-column-header",
      headerName: "Date",
      width: 200,
    },
    {
      field: "time",
      headerClassName: "kyc-column-header",
      headerName: "Time",
      width: 100,
    },
    {
      field: "RefID",
      headerClassName: "kyc-column-header",
      headerName: "Reference ID",
      width: 300,
    },
    {
      field: "depositAmount",
      headerClassName: "kyc-column-header",
      headerName: "Amount",
      width: 200,
    },
    // {
    //   field: "transactionType",
    //   headerName: "Transaction Type",
    //   width: 150,
    // },
    {
      field: "depositStatus",
      headerClassName: "kyc-column-header",
      headerName: "Status",
      width: 100,
    },
  ];

  const changePagination = (event) => {
    console.log(event);
    setPaginationModal({ page: event.page, pageSize: event.pageSize });
  };

  const fetchAllFiatTxn = useCallback(async () => {
    const { data, total } = await makeGetReq(
      `v1/fiat/query-fiat-transaction?&size=${paginationModal.pageSize}&start=${
        paginationModal.page * paginationModal.pageSize
      }`
    );
    const rows = data
      .map((traxn) => ({
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
      }))
      .filter((traxn) => traxn.depositStatus !== "FAILED");

    setFiatTraxns(rows);
    setTotalRows(total);
  }, [paginationModal.page, paginationModal.pageSize]);

  const fetchAllLogs = async () => {
    const { data } = await makeGetReq(
      `v1/admin-logs?actionType=FIAT&adminID=${adminID}`
    );
    console.log(data);
  };

  const getFiatTraxnById = async (userId) => {
    const { data } = await makeGetReq(
      `v1/fiat/query-fiat-transaction?userID=${userId}&type=INR_DEPOSIT`
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
      await fetchAllFiatTxn();
    } catch (err) {
      toggleMessageModal();
      setMessage(err.response.data.ErrorMessage);
      await fetchAllFiatTxn();
    }
  };

  useEffect(() => {
    // getListOfFiatTraxn();
    fetchAllLogs();
    fetchAllFiatTxn();
  }, [fetchAllFiatTxn]);
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h1">Deposit Records</Typography>
      </Box>
      <Box sx={{ height: 500, width: "100%", p: 1 }}>
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
          rows={fiatTraxns}
          columns={columns}
          paginationModel={paginationModal}
          rowCount={totalRows}
          pageSizeOptions={[5, 10]}
          paginationMode="server"
          onPaginationModelChange={changePagination}
          checkboxSelection
          disableRowSelectionOnClick
          isRowSelectable={() => false}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box sx={{ height: 500, width: "50%", p: 1 }}>
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
            columns={depositLogs}
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
            isRowSelectable={() => false}
          />
        </Box>
      </Box>

      <Modal
        open={transactionHistoryModal}
        onClose={toggleViewTransactionModal}
      >
        <Box sx={style}>
          <DataGrid
            sx={{
              ".MuiDataGrid-columnHeaderCheckbox": {
                display: "none",
              },
              "& .MuiDataGrid-cellCheckbox": {
                display: "none",
              },
            }}
            rows={fiatTraxnHistoryRows}
            columns={transactionColumns}
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
            isRowSelectable={() => false}
          />
        </Box>
      </Modal>

      <Modal open={messageModal} onClose={toggleMessageModal}>
        <Box sx={messageModalStyles}>
          <Typography variant="h3" color="#ebff25">
            {message}
          </Typography>
        </Box>
      </Modal>

      <Modal open={remarkModal} onClose={toggleRemarkModal}>
        <Box sx={messageModalStyles}>
          <TextField />
        </Box>
      </Modal>
    </>
  );
}
