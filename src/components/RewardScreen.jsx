/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { makeGetReq } from "../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/kyc/users.slice";

const rewardFormStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const confirmModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function RewardScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [go, setGo] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [rewardFormModal, setRewardFormModal] = useState(false);
  const [rewardType, setRewardType] = useState("");
  const handleChange = (e) => setRewardType(e.target.value);
  const toggleGo = () => setGo(!go);
  const toggleConfirmModal = () => setConfirmModal(!confirmModal);
  const toggleRewardFormModal = () => setRewardFormModal(!rewardFormModal);
  const historyColumns = [
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
      width: 200,
    },
    {
      field: "userName",
      headerClassName: "kyc-column-header",
      headerName: "Username",
      width: 200,
    },
    {
      field: "rewardAmt",
      headerClassName: "kyc-column-header",
      headerName: "Reward Amount",
      width: 200,
    },
    {
      field: "admin",
      headerClassName: "kyc-column-header",
      headerName: "Admin",
      width: 200,
    },
    {
      field: "comments",
      headerClassName: "kyc-column-header",
      headerName: "Comments",
      width: 200,
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Box m={2}>
        <Typography variant="h2">Reward</Typography>
        <Box display="flex">
          <Box width="50%">
            <Box mt={2}>
              <TextField
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <Button
                onClick={toggleGo}
                sx={{ height: "51px" }}
                variant="outlined"
              >
                <Typography variant="h4">Go</Typography>
              </Button>
            </Box>
            <Box mt={3} width="56%">
              {go && (
                <Button
                  onClick={toggleRewardFormModal}
                  fullWidth
                  variant="contained"
                >
                  Click here to give reward
                </Button>
              )}
            </Box>
          </Box>

          <Box width="50%" mt={2}>
            {go && (
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box display="flex">
                      <Typography variant="h4">Name:</Typography>
                    </Box>
                    <Box display="flex">
                      <Typography variant="h4">Email:</Typography>
                    </Box>
                    <Box display="flex">
                      <Typography variant="h4">Phone:</Typography>
                    </Box>
                    <Box>
                      <Button variant="contained">Transaction History</Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>

        <Typography variant="h2" mt={3}>
          Reward History
        </Typography>
        <Box sx={{ pt: 2, height: 650, width: "100%" }}>
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
            columns={historyColumns}
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

      <Modal open={rewardFormModal} onClose={toggleRewardFormModal}>
        <Box sx={rewardFormStyles}>
          <Stack spacing={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select the reward type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rewardType}
                  label="Select the reward type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Special"}>Special</MenuItem>
                  <MenuItem value={"BETA"}>BETA</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField label="Enter the reward amount" />
            <TextField label="Enter the comments" />
            <Box display="flex" justifyContent="center">
              <Button onClick={toggleConfirmModal} variant="contained">
                Confirm
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>

      <Modal open={confirmModal} onClose={toggleConfirmModal}>
        <Box sx={confirmModalStyles}>
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <Typography variant="h2">Are you sure?</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box width="40%">
              <Button fullWidth variant="contained" color="error">
                No
              </Button>
            </Box>
            <Box width="40%">
              <Button fullWidth variant="contained" color="success">
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
