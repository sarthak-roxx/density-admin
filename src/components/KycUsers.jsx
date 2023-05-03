/* eslint-disable  */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// import useSWR from "swr";
import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Modal,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { resetFilter } from "../redux/allUsers/allUsers.slice";
import { useNavigate } from "react-router-dom";

import { makeGetReq } from "../utils/axiosHelper";
import { MobileView, BrowserView } from "react-device-detect";
import FilterComponent from "./FilterComponent";
import dayjs from "dayjs";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const ShowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  borderRadius: "4px",
  border: "1px solid blue",
}));

const FailedTile = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffcccb",
  borderRadius: "4px",
  border: "1px solid black",
}));

const SuccessTile = styled(Box)(({ theme }) => ({
  backgroundColor: "lightgreen",
  borderRadius: "4px",
  border: "1px solid black",
}));

const InProgressTile = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff44f",
  borderRadius: "4px",
  border: "1px solid black",
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

const style = {
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

const accordionItems = [
  {
    id: 1,
    createdOn: "24/1/2022",
    firstName: "Jon",
    lastName: "Snow",
    email: "jon.snow@gmail.com",
    phone: 8585858585,
    kycStatus: "Pending",
    bankVerifyStatus: "Yes",
  },
  {
    id: 2,
    createdOn: "14/5/2022",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@gmail.com",
    phone: 9393939393,
    kycStatus: "Pending",
    bankVerifyStatus: "Yes",
  },
  {
    id: 3,
    createdOn: "24/1/2022",
    firstName: "Jon",
    lastName: "Snow",
    email: "mike.tyson@gmail.com",
    phone: 8585858585,
    kycStatus: "awaiting",
    bankVerifyStatus: "Yes",
  },
  {
    id: 4,
    createdOn: "5/1/2022",
    firstName: "Sarthak",
    lastName: "Verma",
    email: "verma.sarthak@gmail.com",
    phone: 8585858585,
    kycStatus: "done",
    bankVerifyStatus: "Yes",
  },
];

export default function KycUsers() {
  const { userId: adminID } = useSessionContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterByKycStatus, setFilterByKycStatus] = useState("");
  const [filterByEmail, setFilterByEmail] = useState("");
  const [userRows, setUserRows] = useState([]);
  const [bankModal, setBankModal] = useState(false);
  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 5
  });
  const [totalRows, setTotalRows] = useState(0);
  const toggleBankModal = () => setBankModal(!bankModal);
  const usersColumns = [
    {
      field: "createdOn",
      headerClassName: "kyc-column-header",
      headerName: "Created On",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      field: "firstName",
      headerClassName: "kyc-column-header",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerClassName: "kyc-column-header",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerClassName: "kyc-column-header",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerClassName: "kyc-column-header",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "kycStatus",
      headerClassName: "kyc-column-header",
      headerName: "KYC Status",
      width: 150,
      renderCell: (params) => {
        if (params.row.kycStatus === "FAILED")
          return <FailedTile>{params.row.kycStatus}</FailedTile>;
        else if (params.row.kycStatus === "VERIFIED")
          return <SuccessTile>{params.row.kycStatus}</SuccessTile>;
        else return <InProgressTile>{params.row.kycStatus}</InProgressTile>;
      },
    },
    {
      field: "view",
      headerClassName: "kyc-column-header",
      headerName: "Show KYC Data",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ShowButton
              onClick={() => {
                console.log(params);
                navigate(`/kycData/${params.id}`,{state: {email: params?.row?.email, phone: params?.row?.phone}});
              }}
            >
              View
            </ShowButton>
          </>
        );
      },
    },
    {
      field: "bankVerifyStatus",
      headerClassName: "kyc-column-header",
      headerName: "Bank Verification Status",
      width: 200,
    },
    {
      field: "bankDetails",
      headerClassName: "kyc-column-header",
      headerName: "Bank Details",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ShowButton onClick={toggleBankModal}>Bank Details</ShowButton>
          </>
        );
      },
    },
  ];
  const changePagination = (event) =>{
    console.log(event);
    setPaginationModal({ page: event.page , pageSize : event.pageSize});
  }
  const handleAlignment = async (event, newAlignment) => {
    setFilterByKycStatus(newAlignment);
    // setPaginationModal(paginationModal => ({ page: 1, pageSize : paginationModal.pageSize})) 
  }
  const fetchAllUsers = useCallback(async () => {
    // const data = await makeGetReq("/v1/kyc/query-kyc?status=FAILED");
    const { data, total } = await makeGetReq(`/v1/kyc/query-kyc?status=${filterByKycStatus}&pageSize=${paginationModal.pageSize}&pageNo=${paginationModal.page+1}`);
    const rows = data.map((user) => ({
      id: user.id,
      createdOn: user.created,
      email: user.email,
      firstName: user.firstName || "---",
      lastName: user.lastName || "---",
      kycStatus: user.kycStatus,
      phone: user.mobileNumber || "---",
      bankVerifyStatus: user.pennyDropStatus,
    }));
    setUserRows(rows);
    setTotalRows(total)
  }, [paginationModal.page, paginationModal.pageSize, filterByKycStatus])

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  
  return (
    <>
      <BrowserView>
        <Box m={2} display="flex" justifyContent="center" marginBottom={1}>
          <Box display="flex" gap={"1rem"}>
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
                  <Typography variant="h4">All Users</Typography>
                </ToggleButton>
                <ToggleButton value="FAILED">
                  <Typography variant="h4">Failed KYC</Typography>
                </ToggleButton>
                <ToggleButton value="IN_PROGRESS">
                  <Typography variant="h4">In_Progress KYC</Typography>
                </ToggleButton>
                <ToggleButton value="VERIFIED">
                  <Typography variant="h4">Success KYC</Typography>
                </ToggleButton>
              </StyledToggleButtonGroup>
            </Paper>
            <Box
              sx={{
                "& .MuiButtonBase-root": {
                  height: "45.83px",
                },
              }}
              display="flex"
              justifyContent="flex-end"
            >
              <FilterComponent />
            </Box>
            <Button onClick={() => dispatch(resetFilter())} variant="contained">
              Reset filter
            </Button>
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
            rows={userRows}
            columns={usersColumns}
            paginationModel={paginationModal}
            rowCount={totalRows}
            pageSizeOptions={[5,10]}
            paginationMode="server"
            onPaginationModelChange={changePagination}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

        <Modal open={bankModal} onClose={toggleBankModal}>
          <Box sx={style}>
            <IconButton
              onClick={toggleBankModal}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>

            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Typography variant="h3">Bank Details</Typography>
            </Box>
            <Box>
              <Box display="flex" gap={1}>
                <Typography color="grey" variant="h4">
                  Account No.:
                </Typography>
                <Typography variant="h4">XXXX XXXX XXXX X983</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography color="grey" variant="h4">
                  IFSC No.:
                </Typography>
                <Typography variant="h4">SBIN934343434343</Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </BrowserView>

      <MobileView>
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">jon.doe@gmail.com</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">jane.doe@gmail.com</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        <Box mt={2} mx={1}>
          <Box mb={1}>
            <TextField
              label="Enter email"
              value={filterByEmail}
              onChange={(e) => setFilterByEmail(e.target.value)}
              fullWidth
            />
          </Box>
          {accordionItems
            .filter((accItem) => accItem.email.includes(filterByEmail))
            .map((accItem) => (
              <Accordion key={accItem.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h3">{accItem.email}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card>
                    <CardContent>
                      <Box display="flex" flexDirection={"column"} gap={2}>
                        <Box
                          boxShadow="15px"
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Name</Typography>
                          <hr />
                          <Typography variant="h4">Jon Snow</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Email</Typography>
                          <hr />
                          <Typography variant="h4">
                            jon.snow@gmail.com
                          </Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>DOB</Typography>
                          <hr />
                          <Typography variant="h4">14/10/1998</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Gender</Typography>
                          <hr />
                          <Typography variant="h4">Male</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Phone</Typography>
                          <hr />
                          <Typography variant="h4">8585858556</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Name Match</Typography>
                          <hr />
                          <Typography variant="h4">65%</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Selfie Match</Typography>
                          <hr />
                          <Typography variant="h4">75%</Typography>
                        </Box>
                        <Box
                          border="2px solid grey"
                          borderRadius="5px"
                          padding={1}
                        >
                          <Typography>Method</Typography>
                          <hr />
                          <Typography variant="h4">
                            DIGILOCKER/DOCUMENT UPLOAD
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      </MobileView>
    </>
  );
}
