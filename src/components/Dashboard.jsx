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
import React, { useEffect, useState } from "react";
// import useSWR from "swr";
import { shades } from "../utils/theme";
// import axios from "axios";
import { BrowserView } from "react-device-detect";
import { makeGetReq, makePostReq } from "../utils/axiosHelper";
import InfoModal from "./InfoModal";

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
  const [osType, setOsType] = useState("");
  const [changeAppVerModal, setChangeAppVerModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const toggleInfoModal = () => setShowInfoModal(!showInfoModal);
  const toggleChangeAppVerModal = () =>
    setChangeAppVerModal(!changeAppVerModal);
  const [showAppVersion, setShowAppVersion] = useState("");
  const [showInfoMessage, setShowInfoMessage] = useState("");
  // const [appVer, setAppVer] = useState();

  const getAppVer = async () => {
    const data = await makeGetReq("v1/mobile/version?osType=ANDROID");
    setShowAppVersion(data?.version);
  };

  const changeAppVersion = async () => {
    makePostReq("v1/mobile/version", {
      osType,
      version: appVersion,
    })
      .then((res) => {
        setShowInfoMessage(res.data.message);
        toggleInfoModal();
        toggleChangeAppVerModal();
        getAppVer();
      })
      .catch((err) => {
        setShowInfoMessage(err.response.data.ErrorMessage);
        toggleInfoModal();
        toggleChangeAppVerModal();
      });
  };

  useEffect(() => {
    getAppVer();
  }, []);

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
                {/* <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Sign Up Users
                    </Typography>
                    <Typography variant="h1">197</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 200 }}>
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
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Failed KYC
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      44
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Deposit Request
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      96
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      Total Withdraw Request
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      29
                    </Typography>
                  </CardContent>
                </Card> */}
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom mb={5}>
                      App Version
                    </Typography>
                    <Typography variant="h1" mb={1}>
                      {showAppVersion}
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
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="Enter os type"
            value={osType}
            onChange={(e) => setOsType(e.target.value)}
          />
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button onClick={changeAppVersion} variant="contained">
              Change
            </Button>
          </Box>
        </Box>
      </Modal>

      <InfoModal
        modal={showInfoModal}
        toggleModal={toggleInfoModal}
        message={showInfoMessage}
      />
    </>
  );
}
