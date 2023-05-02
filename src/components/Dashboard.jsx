import {
  Card,
  Box,
  Typography,
  CardContent,
  useMediaQuery,
  TextField,
  Modal,
  Button,
} from "@mui/material";
// import { logoutApp } from "../services/Supertokens/SuperTokensHelper";
// import axiosInstance, { makeGetReq } from "../utils/axiosHelper";
import React, { useState } from "react";
// import useSWR from "swr";
import { shades } from "../utils/theme";
// import axios from "axios";
import { BrowserView } from "react-device-detect";

const changeAppVerModalStyles = {
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

export default function Dashboard() {
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appVersion, setAppVersion] = useState("");
  const [changeAppVerModal, setChangeAppVerModal] = useState(false);
  const toggleChangeAppVerModal = () =>
    setChangeAppVerModal(!changeAppVerModal);

  return (
    <>
      <BrowserView>
        <Box>
          <Box my={1} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={toggleChangeAppVerModal}>
              Change App Version
            </Button>
          </Box>

          <Card>
            <CardContent sx={{ backgroundColor: shades.neutral[200] }}>
              <Box
                display="flex"
                flexDirection={isMobile ? "row" : "column"}
                justifyContent="space-between"
              >
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Sign Up Users
                    </Typography>
                    <Typography variant="h1">197</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Success KYC
                    </Typography>
                    <Typography variant="h1">85</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Pending KYC
                    </Typography>
                    <Typography variant="h1">46</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Failed KYC
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      44
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Deposit Request
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      96
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 240 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Withdraw Request
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      29
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </BrowserView>

      <Modal open={changeAppVerModal} onClose={toggleChangeAppVerModal}>
        <Box sx={changeAppVerModalStyles}>
          <TextField
            fullWidth
            label="Enter app version"
            value={appVersion}
            onChange={(e) => setAppVersion(e.target.value)}
          />
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button variant="contained">Change</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
