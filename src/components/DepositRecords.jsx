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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
const csvModalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "80%",
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
  // const { userId: adminID } = useSessionContext();

  const [message, setMessage] = useState("");

  const [csvFormData, setCsvFormData] = useState({
    traxnId: "",
    userId: "",
    status: "",
    // startTime: dayjs(new Date().toLocaleDateString())
    //   .toDate()
    //   .toLocaleDateString(),
    // endTime: dayjs(new Date().toLocaleDateString())
    //   .toDate()
    //   .toLocaleDateString(),
  });

  const [queryCsvModal, setQueryCsvModal] = useState(false);
  const toggleQueryCsvModal = () => setQueryCsvModal(!queryCsvModal);

  const [messageModal, setMessageModal] = useState(false);
  const toggleMessageModal = () => setMessageModal(!messageModal);

  const [fiatTraxnHistoryRows, setFiatTraxnHistoryRows] = useState([]);

  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [depositRows, setDepositRows] = useState([]);
  const [depositPaginationModal, setDepositPaginationModal] = useState({
    page: 0,
    pageSize: 5,
  });

  const [totalDepositLogRows, setTotalDepositLogRows] = useState(0);

  const [fiatTraxns, setFiatTraxns] = useState([]);
  const [transactionHistoryModal, setTransactionHistoryModal] = useState(false);
  const toggleViewTransactionModal = () =>
    setTransactionHistoryModal(!transactionHistoryModal);

  const depositLogs = [
    {
      field: "timestamp",
      headerClassName: "kyc-column-header",
      headerName: "Timestamp",
      width: 250,
    },
    {
      field: "action",
      headerClassName: "kyc-column-header",
      headerName: "Action",
      width: 250,
    },
    {
      field: "admin",
      headerClassName: "kyc-column-header",
      headerName: "Admin",
      width: 300,
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
        return (
          <>
            <ApproveButton
              disabled={params.row.depositStatus == "SUCCESS"}
              onClick={async () => {
                processTraxn(
                  params.row.UserID,
                  "approve",
                  params.row.RefID,
                  params.row.FiatTxnID
                );
                await fetchAllLogs();
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
              disabled={params.row.depositStatus == "SUCCESS"}
              onClick={async () => {
                await processTraxn(
                  params.row.UserID,
                  "reject",
                  params.row.RefID,
                  params.row.FiatTxnID
                );
                await fetchAllLogs();
              }}
            >
              Reject
            </RejectButton>
          </>
        );
      },
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

  const changePaginationLogs = (event) => {
    setDepositPaginationModal({ page: event.page, pageSize: event.pageSize });
  };

  const fetchAllFiatTxn = useCallback(async () => {
    const { data, total } = await makeGetReq(
      `v1/fiat/query-fiat-transaction?type=INR_DEPOSIT&size=${
        paginationModal.pageSize
      }&start=${paginationModal.page * paginationModal.pageSize}`
    );
    // console.log(total);
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

  const fetchAllLogs = useCallback(async () => {
    const { data, total } = await makeGetReq(
      `v1/admin-logs?actionType=FIAT&size=${
        depositPaginationModal.pageSize
      }&pageNo=${depositPaginationModal.page + 1}`
    );
    const rows = data.map((log) => ({
      id: log.logID,
      admin: log.adminName,
      timestamp: new Date(log.createdAt).toLocaleDateString(),
      action: log.actionRemark,
    }));
    setDepositRows(rows);
    setTotalDepositLogRows(total);
  }, [depositPaginationModal.page, depositPaginationModal.pageSize]);

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
    fetchAllLogs();
    fetchAllFiatTxn();
  }, [fetchAllFiatTxn, fetchAllLogs]);
  return (
    <>
      <Box mt={1} display="flex">
        <Box width="55%" display="flex" justifyContent="flex-end">
          <Typography variant="h1">Deposit Records</Typography>
        </Box>
        <Box width="45%" display="flex" justifyContent="flex-end">
          <Button onClick={toggleQueryCsvModal} variant="contained">
            Download deposit records
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 620, width: "100%", p: 1 }}>
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
            border: 2,
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
        <Typography variant="h1">Deposit Logs</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box sx={{ height: 650, width: "60%", p: 1 }}>
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
              border: 2,
            }}
            rows={depositRows}
            columns={depositLogs}
            paginationModel={depositPaginationModal}
            rowCount={totalDepositLogRows}
            paginationMode="server"
            pageSizeOptions={[5, 10]}
            onPaginationModelChange={changePaginationLogs}
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

      <Modal open={queryCsvModal} onClose={toggleQueryCsvModal}>
        <Box sx={csvModalStyle}>
          <TextField fullWidth label="Enter traxn id" />
          <TextField sx={{ mt: 2 }} fullWidth label="Enter User id" />
          <TextField sx={{ mt: 2 }} fullWidth label="status" />
          {/* <TextField sx={{ mt: 2 }} fullWidth label="startTime" /> */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Enter start time"
                  value={csvFormData.startTime}
                  onChange={(newDate) =>
                    setCsvFormData({ ...csvFormData, startTime: newDate })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Enter end time"
                  value={csvFormData.startTime}
                  onChange={(newDate) =>
                    setCsvFormData({ ...csvFormData, startTime: newDate })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <TextField sx={{ mt: 2 }} fullWidth label="size" />
          <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
            <Button variant="contained">Download</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
