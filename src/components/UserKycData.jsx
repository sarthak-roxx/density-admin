/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useSWR from "swr";
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

export default function UserKycData() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const toggleConfirmModal = () => setConfirmModalOpen(!confirmModalOpen);
  const isMobile = useMediaQuery("(min-width:768px)");
  const [enlarge, setEnlarge] = useState(false);
  const toggleEnlarge = () => setEnlarge(!enlarge);

  // const { data } = useSWR(
  //   "adminV0.1/GetUserKYC?userID=c0cc6ac9-70c2-4099-95ad-087ea39d3e90",
  //   makeGetReq
  // );
  // console.log(data);

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
          gap={5}
          position="relative"
        >
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" marginBottom={5}>
                <Typography variant="h3">Aadhar Details</Typography>
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Name:
                    </Typography>
                    <Typography variant="h4">Jon Snow</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Gender:
                    </Typography>
                    <Typography variant="h4">Male</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      DOB:
                    </Typography>
                    <Typography variant="h4">14/10/1998</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Aadhar No.:
                    </Typography>
                    <Typography variant="h4">XXXXXXXXXXX83</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Address:
                    </Typography>
                    <Typography variant="h4"></Typography>
                  </Box>
                </Box>

                <div
                  id="img-tile"
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "grey",
                    width: "8vw",
                    height: "20vh",
                    position: "absolute",
                    top: 50,
                    left: 240,
                    zIndex: 1000,
                  }}
                  onClick={resizeImg}
                ></div>
              </Box>
              <Box mt={1} display="flex" justifyContent="flex-end">
                <Button variant="outlined">Download in XML format</Button>
                <Button onClick={enlargeImg} variant="outlined">
                  <Typography variant="h5">Click here to enlarge</Typography>
                </Button>
              </Box>
              <Box display="flex" gap={22} marginTop={2}>
                <Button color="error" variant="contained">
                  Reset
                </Button>
                <Button
                  onClick={toggleConfirmModal}
                  color="success"
                  variant="contained"
                >
                  Approve
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <Typography variant="h3">PAN Details</Typography>
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Name:
                    </Typography>
                    <Typography variant="h4">Jon Snow</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      Pan No.:
                    </Typography>
                    <Typography variant="h4">XXXXXXXX87</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Typography color="grey" variant="h4">
                      DOB:
                    </Typography>
                    <Typography variant="h4">14/10/1998</Typography>
                  </Box>
                </Box>

                <div
                  id="img-tile"
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "grey",
                    width: "8vw",
                    height: "20vh",
                    // position: "absolute",
                    // top: 50,
                    // left: 240,
                    // zIndex: 1000,
                  }}
                  onClick={resizeImg}
                ></div>
              </Box>
              <Box mt={1} display="flex" justifyContent="flex-end">
                <Button onClick={enlargeImg} variant="outlined">
                  <Typography variant="h5">Click here to enlarge</Typography>
                </Button>
              </Box>
              <Box display="flex" gap={16} marginTop={2}>
                <Button color="error" variant="contained">
                  Reset
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={toggleConfirmModal}
                >
                  Approve
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <Typography variant="h3">Selfie details</Typography>
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <Box display="flex" gap={1}>
                  <Typography color="grey" variant="h4">
                    Selfie Match:
                  </Typography>
                  <Typography variant="h4">98%</Typography>
                </Box>

                <div
                  id="img-tile"
                  style={{
                    border: "1px solid grey",
                    backgroundColor: "grey",
                    width: "8vw",
                    height: "20vh",
                    // position: "absolute",
                    // top: 50,
                    // left: 240,
                    // zIndex: 1000,
                  }}
                  onClick={resizeImg}
                ></div>
              </Box>
              <Box mt={1} display="flex" justifyContent="flex-end">
                <Button onClick={enlargeImg} variant="outlined">
                  <Typography variant="h5">Click here to enlarge</Typography>
                </Button>
              </Box>
              <Box display="flex" gap={14} marginTop={2}>
                <Button color="error" variant="contained">
                  Reset
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={toggleConfirmModal}
                >
                  Approve
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box width={isMobile ? "30%" : "100%"} border="1px solid grey">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h3">Timestamp</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h3">Action</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h3">Admin</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Add Admin log entries here */}
          </Table>
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
