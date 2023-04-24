/* eslint-disable */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { makeGetReq } from "../utils/axiosHelper";
import { addAllAdmins } from "../redux/allAdmins/allAdmins.slice";

const RoleTile = styled(Box)(({ theme }) => ({
  textAlign: "center",
  border: "1px solid green",
  backgroundColor: "lightgreen",
  borderRadius: "4px",
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  borderRadius: "4px",
  border: "1px solid blue",
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff7f7f",
  borderRadius: "4px",
  border: "1px solid red",
}));

const Roles = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
}));

const addAdminModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function AdminUsersTable() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [addAdminModal, setAddAdminModal] = useState(false);
  const toggleAddAdminModal = () => setAddAdminModal(!addAdminModal);
  const adminColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "superAdmin",
      headerName: "SuperAdmin",
      width: 100,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Roles>
              {params.value.map((role, idx) => (
                <RoleTile key={idx}>{role.Role}</RoleTile>
              ))}
            </Roles>
          </>
        );
      },
    },
  ];

  const getAllAdmins = async () => {
    const admins = await makeGetReq("admin");
    dispatch(addAllAdmins(admins));
  };

  const adminRows = admins.map((admin) => ({
    id: admin.ID,
    name: admin.Name,
    email: admin.Email,
    superAdmin: admin.IsSuperAdmin,
    role: admin.Roles,
  }));

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <>
      <Box m={1}>
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Button onClick={toggleAddAdminModal} variant="contained">
            Create an admin
          </Button>
        </Box>
        <Box height={650}>
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
            rows={adminRows}
            columns={adminColumns}
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
      </Box>

      {/* Modals */}
      <Modal open={addAdminModal} onClose={toggleAddAdminModal}>
        <Box sx={addAdminModalStyles}>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <TextField
                sx={{ mb: 1 }}
                label="Enter name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                label="Enter email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <FormLabel id="superadmin-radio-buttons">
                <Typography variant="h4">Is SuperAdmin</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="superadmin-radio-buttons"
                value={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.value)}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
