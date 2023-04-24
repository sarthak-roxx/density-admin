/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
// import axiosInstance from "../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/kyc/users.slice";
import { makeGetReq, makePatchReq, makePostReq } from "../utils/axiosHelper";

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

export default function DepositRecords() {
  const dispatch = useDispatch();

  const [transactionHistoryModal, setTransactionHistoryModal] = useState(false);
  const toggleViewTransactionModal = () =>
    setTransactionHistoryModal(!transactionHistoryModal);

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
      width: 100,
    },
    {
      field: "userName",
      headerName: "Username",
      headerClassName: "kyc-column-header",
      width: 100,
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
      field: "refNo",
      headerName: "Reference Number",
      cellClassName: "kyc-row-style",
      headerClassName: "kyc-column-header",
      width: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      headerClassName: "kyc-column-header",
      width: 120,
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
            <ViewButton onClick={toggleViewTransactionModal}>
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
            <ApproveButton>Approve</ApproveButton>
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
            <RejectButton>Delete</RejectButton>
          </>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      date: "24/01/2021",
      time: "23:12",
      userName: "jon.snow",
      email: "jon.snow@gmail.com",
      bankAccNo: "XXXXXXXX34",
      depositAmount: "₹450",
      refNo: 888888888,
      paymentMethod: "Card",
      depositStatus: "pending",
    },
    {
      id: 2,
      date: "24/01/2021",
      time: "23:12",
      userName: "jon.snow",
      email: "jon.snow@gmail.com",
      bankAccNo: "XXXXXXXX34",
      depositAmount: "₹450",
      refNo: 888888888,
      paymentMethod: "Card",
      depositStatus: "pending",
    },
    {
      id: 3,
      date: "24/01/2021",
      time: "23:12",
      userName: "jon.snow",
      email: "jon.snow@gmail.com",
      bankAccNo: "XXXXXXXX34",
      depositAmount: "₹450",
      refNo: 888888888,
      paymentMethod: "Card",
      depositStatus: "pending",
    },
    {
      id: 4,
      date: "24/01/2021",
      time: "23:12",
      userName: "jon.snow",
      email: "jon.snow@gmail.com",
      bankAccNo: "XXXXXXXX34",
      depositAmount: "₹450",
      refNo: 888888888,
      paymentMethod: "Card",
      depositStatus: "pending",
    },
    {
      id: 5,
      date: "24/01/2021",
      time: "23:12",
      userName: "jon.snow",
      email: "jon.snow@gmail.com",
      bankAccNo: "XXXXXXXX34",
      depositAmount: "₹450",
      refNo: 888888888,
      paymentMethod: "Card",
      depositStatus: "pending",
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
      headerName: "Date",
      width: 200,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "referenceId",
      headerName: "Reference ID",
      width: 300,
    },
  ];
  // const users = useSelector((state) => state.users.users);

  const getAllAdmins = async () => {
    const admins = await makeGetReq("v1/admins");
    console.log(admins);
  };

  // const makeAdmin = async () => {
  //   const data = await makePostReq("admin", {
  //     name: "Jon Snow",
  //     email: "jon.snow@density.exchange",
  //     willSuperAdmin: true,
  //   });
  //   console.log(data);
  // };

  const addRole = async () => {
    const data = await makePostReq("role", {
      permissions: [
        "a25a1697-7540-42ab-90af-1691c2d4cb9f",
        "af17e2cb-0ae4-4614-b836-b5b28d5f0c3c",
      ],
      role: "Support",
    });
    console.log(data);
  };

  const getAllPermissions = async () => {
    const permissions = await makeGetReq("permissions");
    console.log(permissions);
  };

  const makePermission = async () => {
    const permission = await makePostReq("permission", {
      permission: "UserUpdater",
    });
    console.log(permission);
  };

  const assignRole = async () => {
    const data = await makePatchReq("role/assign", {
      adminID: "8ecc2ed0-1493-4e1a-b5fe-9a5e6869285f",
      roles: ["87691451-232f-4d58-b796-03a97ff0f50a"],
    });
    console.log(data);
  };

  useEffect(() => {
    // dispatch(fetchUsers());
    // getAllAdmins();
    // addRole();
    // getAllPermissions();
    // makePermission();
    assignRole();
  }, []);
  return (
    <>
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
          rows={rows}
          columns={columns}
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
            rows={transactionRows}
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
    </>
  );
}
