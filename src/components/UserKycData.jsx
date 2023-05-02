/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Modal,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeGetReq } from "../utils/axiosHelper";
import { MobileView } from "react-device-detect";
import { DataGrid } from "@mui/x-data-grid";
import pp from "../utils/imgs/PP.jpg";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const adminLogsColumns = [
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
  },
  {
    field: "admin",
    headerName: "Admin",
    width: 200,
  },
];

export default function UserKycData() {
  const { userID } = useParams();
  const [userKycData, setUserKycData] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const toggleConfirmModal = () => setConfirmModalOpen(!confirmModalOpen);
  const isMobile = useMediaQuery("(min-width:768px)");
  const [enlarge, setEnlarge] = useState(false);
  const toggleEnlarge = () => setEnlarge(!enlarge);

  const [isAadharSelfieOpen, setIsAadharSelfieOpen] = useState(false);
  const handleAadharSelfieDialog = () =>
    setIsAadharSelfieOpen(!isAadharSelfieOpen);

  const [isPanSelfieOpen, setIsPanSelfieOpen] = useState(false);
  const handlePanSelfieDialog = () => setIsPanSelfieOpen(!isPanSelfieOpen);

  const [isSelfieOpen, setIsSelfieOpen] = useState(false);
  const handleSelfieDialog = () => setIsSelfieOpen(!isSelfieOpen);

  const enlargeImg = () => {
    const imgTile = document.getElementById("img-tile");
    imgTile.style.transform = "scale(1)";
    imgTile.style.width = "60vw";
    imgTile.style.height = "50vh";
    imgTile.style.transition = "transform 1 ease";
  };

  const resizeImg = () => {
    const imgTile = document.getElementById("img-tile");
    imgTile.style.transform = "scale(1)";
    imgTile.style.width = "8vw";
    imgTile.style.height = "20vh";
    imgTile.style.transition = "transform 1 ease";
  };

  const fetchUserKycDetails = async () => {
    const { data } = await makeGetReq(
      `v1/users/${userID}/kyc?userID=${userID}`
    );
    setUserKycData(data);
  };

  useEffect(() => {
    fetchUserKycDetails();
  }, []);

  return (
    <>
      <Box margin={1}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              flexDirection={isMobile ? "row" : "column"}
              gap={2}
            >
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
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Email</Typography>
                <hr />
                <Typography variant="h4">jon.snow@gmail.com</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>DOB</Typography>
                <hr />
                <Typography variant="h4">14/10/1998</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Gender</Typography>
                <hr />
                <Typography variant="h4">Male</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Phone</Typography>
                <hr />
                <Typography variant="h4">8585858556</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Name Match</Typography>
                <hr />
                <Typography variant="h4">65%</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Selfie Match</Typography>
                <hr />
                <Typography variant="h4">75%</Typography>
              </Box>
              <Box border="2px solid grey" borderRadius="5px" padding={1}>
                <Typography>Method</Typography>
                <hr />
                <Typography variant="h4">DIGILOCKER/DOCUMENT UPLOAD</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box
        display="flex"
        flexDirection={isMobile ? "row" : "column"}
        margin={1}
      >
        <Box
          width={isMobile ? "70%" : "100%"}
          display="flex"
          flexDirection={isMobile ? "row" : "column"}
          justifyContent="space-around"
        >
          <Box width={isMobile ? "40%" : "100%"}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Typography variant="h3">Aadhar Details</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Name:
                      </Typography>
                      <Typography variant="h5">
                        {userKycData?.POAData?.name}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Gender:
                      </Typography>
                      <Typography variant="h5">
                        {userKycData?.POAData?.gender}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        DOB:
                      </Typography>
                      <Typography variant="h5">{userKycData?.POAData?.DOB}</Typography>
                    </Box>
                    <Box display="flex" gap={1} width={10}>
                      <Typography color="grey" variant="h5">
                        Aadhar No.:
                      </Typography>
                      <Typography variant="h5">{userKycData?.POAData?.IDNumber}</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Address:
                      </Typography>
                      <Typography variant="h5"></Typography>
                    </Box>
                  </Box>

                  <img
                    width="40%"
                    className="small"
                    src={pp}
                    alt="aadhar selfie"
                  />
                  {isAadharSelfieOpen && (
                    <dialog
                      className="dialog"
                      style={{ position: "absolute", zIndex: 1000 }}
                      open
                      onClick={handleAadharSelfieDialog}
                    >
                      <img
                        className="image"
                        src={pp}
                        alt="aadhar dialog selfie"
                        onClick={handleAadharSelfieDialog}
                      />
                    </dialog>
                  )}
                </Box>
                <Box mt={1.5} display="flex" justifyContent="space-between">
                  <Button variant="outlined" size="small">
                    <Typography variant="h5">Download in XML format</Typography>
                  </Button>
                  <Button
                    onClick={handleAadharSelfieDialog}
                    variant="outlined"
                    size="small"
                  >
                    <Typography variant="h5">Click here to enlarge</Typography>
                  </Button>
                </Box>
                <Box marginTop={2}>
                  <Button
                    onClick={toggleConfirmModal}
                    color="success"
                    variant="contained"
                    fullWidth
                  >
                    Approve
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box width={isMobile ? "20%" : "100%"}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" marginBottom={2}>
                  <Typography variant="h3">PAN Details</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Name:
                      </Typography>
                      <Typography variant="h5">Jon Snow</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Pan No.:
                      </Typography>
                      <Typography variant="h5">XXXXXXXX87</Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        DOB:
                      </Typography>
                      <Typography variant="h5">14/10/1998</Typography>
                    </Box>
                  </Box>
                </Box>
                {/* <Box mt={1} display="flex" justifyContent="flex-end">
                  <Button onClick={handlePanSelfieDialog} variant="outlined">
                    <Typography variant="h5">Click here to enlarge</Typography>
                  </Button>
                </Box> */}
                <Box marginTop={2}>
                  <Button
                    onClick={toggleConfirmModal}
                    color="error"
                    variant="contained"
                    fullWidth
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box width={isMobile ? "40%" : "100%"}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" marginBottom={2}>
                  <Typography variant="h3">Selfie details</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h5">
                      Selfie Match:
                    </Typography>
                    <Typography variant="h5">98%</Typography>
                  </Box>

                  <img
                    width="40%"
                    className="small"
                    src={pp}
                    alt="aadhar selfie"
                  />
                  {isSelfieOpen && (
                    <dialog
                      className="dialog"
                      style={{ position: "absolute", zIndex: 1000 }}
                      open
                      onClick={handleSelfieDialog}
                    >
                      <img
                        className="image"
                        src={pp}
                        alt="aadhar dialog selfie"
                        onClick={handleSelfieDialog}
                      />
                    </dialog>
                  )}
                </Box>
                <Box mt={1} display="flex" justifyContent="flex-end">
                  <Button onClick={handleAadharSelfieDialog} variant="outlined">
                    <Typography variant="h5">Click here to enlarge</Typography>
                  </Button>
                </Box>
                <Box marginTop={2}>
                  <Button
                    onClick={toggleConfirmModal}
                    color="error"
                    variant="contained"
                    fullWidth
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box width={isMobile ? "30%" : "100%"} border="1px solid grey">
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
            columns={adminLogsColumns}
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

      <Box display="flex" justifyContent="center" marginTop={10}>
        <Box width="50%">
          <Button fullWidth variant="contained">
            Failed
          </Button>
        </Box>
      </Box>

      <Modal onClose={toggleConfirmModal} open={confirmModalOpen}>
        <Box sx={style}>
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
