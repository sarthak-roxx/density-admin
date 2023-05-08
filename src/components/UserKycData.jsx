/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeGetReq } from "../utils/axiosHelper";
import { MobileView } from "react-device-detect";
import { DataGrid } from "@mui/x-data-grid";
import pp from "../utils/imgs/PP.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RemarkModal from "./RemarkModal";
import { updateKYVStatus } from "../utils/updateKYCStatus";

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
  const {state} = useLocation();
  const navigate = useNavigate();
  const { userID } = useParams();
  const [userKycData, setUserKycData] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const isNotMobile = useMediaQuery("(min-width:768px)");
  const [enlarge, setEnlarge] = useState(false);
  const toggleEnlarge = () => setEnlarge(!enlarge);
  const [showRemarkError, setShowRemarksError] = useState(false);
  const [logs, setLogs] = useState([]);
  const userRemark = useRef()
  const [remarkModal, setRemarkModal] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const actionRef = useRef("");

  const [isAadharSelfieOpen, setIsAadharSelfieOpen] = useState(false);
  const handleAadharSelfieDialog = () =>
    setIsAadharSelfieOpen(!isAadharSelfieOpen);

  const [isPanSelfieOpen, setIsPanSelfieOpen] = useState(false);
  const handlePanSelfieDialog = () => setIsPanSelfieOpen(!isPanSelfieOpen);

  const [isSelfieOpen, setIsSelfieOpen] = useState(false);
  const handleSelfieDialog = () => setIsSelfieOpen(!isSelfieOpen);
  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 5
  });

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
  const {page, pageSize} = paginationModal;

  const fetchLogs = useCallback(async () =>{
    const response = await makeGetReq(`/v1/admin-logs?actionType=KYC&pageNo=${page+1}&size=${pageSize}&userID=${userID}`)
    // setLogs(response.data);
    const logsRows = response?.data?.map((log) => ({
        id: log?.logID,
        timestamp: new Date(log.createdAt)?.toLocaleString(),
        action: log?.actionRemark,
        admin: log?.adminID
    }));
    setLogs(logsRows);
    setTotalRows(response?.total);
  },[page,pageSize])

  const handleUpdateKYC = async () => {
    console.log(userRemark.current.value, "value print kar")
    if(!userRemark.current.value && actionRef.current === 'FAILED'){
      setShowRemarksError(true);
      return;
    }
   const {message} = await updateKYVStatus({action: actionRef.current, userID, remarks: userRemark.current.value});
   if (message === "OK") {
    navigate('/kycUsers')
   }
   else{
    alert("error");
   }
   setShowRemarksError(false);
    
  }

  useEffect(() => {
    makeGetReq(
      `v1/users/${userID}/kyc?userID=${userID}`
    ).then(({data}) => {
      setUserKycData(data);
    });
    
    
  }, []);

  const getFieldData = (data) => {
    if(data){
      return data;
    }
    return "--";
  }

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs])

  const getStepStatus = (item) => {
    // // console.log(item)
    let val = userKycData?.steps && userKycData?.steps[item]?.status;
    console.log(val)
    if(!val) return <></>
    switch(val){
      case "SUCCESS":
        return <Typography sx={{color: "#2e7d32", fontWeight:"500", fontSize:"28px" }}>Approved</Typography>;
      case "FAILED":
        return <Typography sx={{color: "#d32f2f", fontWeight:"500", fontSize:"28px" }}>Failed</Typography>;
      default: 
         return <Typography sx={{color: "#fff44f", fontWeight:"500", fontSize:"28px" }}>Pending</Typography>;
    }

  }
  return (
    <>
      <Box margin={1}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              flexDirection={isNotMobile ? "row" : "column"}
              gap={2}
            >
              <Box
                boxShadow="15px"
                padding={1}
              >
                <Typography>Name</Typography>
                <hr />
                <Typography variant="h4">{getFieldData(userKycData?.documentDetail?.POAData?.name)}</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>Email</Typography>
                <hr />
                <Typography variant="h4">{getFieldData(state?.email)}</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>DOB</Typography>
                <hr />
                <Typography variant="h4">{getFieldData(userKycData?.documentDetail?.POAData?.DOB)}</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>Gender</Typography>
                <hr />
                <Typography variant="h4">{userKycData?.documentDetail?.POAData?.gender ? (userKycData?.documentDetail?.POAData?.gender === 'M' ? "Male" : "Female") : "--"}</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>Phone</Typography>
                <hr />
                <Typography variant="h4">{getFieldData(state?.phone)}</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>Name Match</Typography>
                <hr />
                <Typography variant="h4">{userKycData?.documentDetail?.IdentityMatchData ? (userKycData?.documentDetail?.IdentityMatchData?.nameMatchScore / 5) * 100 : "--"} %</Typography>
              </Box>
              <Box  padding={1}>
                <Typography>Selfie Match</Typography>
                <hr />
                <Typography variant="h4">
                {getFieldData(userKycData?.documentDetail?.FaceMatchData?.matchPercentWithPOAImage)}%
                </Typography>
              </Box>
              <Box padding={1}>
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
        flexDirection={isNotMobile ? "row" : "column"}
        margin={1}
        marginBottom={10}
      >
        <Box
          width={isNotMobile ? "70%" : "100%"}
          display="flex"
          flexDirection={isNotMobile ? "row" : "column"}
          justifyContent="space-around"
          alignItems="center"
        >
          <Box width={isNotMobile ? "35%" : "100%"}>
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
                        {getFieldData(userKycData?.documentDetail?.POAData?.name)}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Gender:
                      </Typography>
                      <Typography variant="h5">
                        {userKycData?.documentDetail?.POAData?.gender ? (userKycData?.documentDetail?.POAData?.gender === 'M' ? "Male" : "Female") : "--"}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        DOB:
                      </Typography>
                      <Typography variant="h5">
                        {getFieldData(userKycData?.documentDetail?.POAData?.DOB)}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1} width={10}>
                      <Typography color="grey" variant="h5">
                        Aadhar No.:
                      </Typography>
                      <Typography variant="h5">
                        {getFieldData(userKycData?.documentDetail?.POAData?.IDNumber)}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Address:
                      </Typography>
                      <Typography variant="h5" sx={{maxWidth:"120px"}}>
                        { userKycData?.documentDetail?.POAData?.address ? userKycData?.documentDetail?.POAData?.address?.house +
                          ", " +
                          userKycData?.documentDetail?.POAData?.address?.landmark +
                          ", " +
                          userKycData?.documentDetail?.POAData?.address?.landmark : "--"}
                      </Typography>
                    </Box>
                  </Box>

                  { userKycData?.documentDetail?.POAData?.documentImageURL && <img
                    width="40%"
                    className="small"
                    src={userKycData?.documentDetail?.POAData?.documentImageURL}
                    alt="aadhar selfie"
                  />}
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
                <Box marginTop={2} textAlign={"center"}>
                  {userKycData && getStepStatus("PROOF_OF_ADDRESS")}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box width={isNotMobile ? "20%" : "100%"} minHeight={"250px"}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" marginBottom={2}>
                  <Typography variant="h3">PAN Details</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Name:
                      </Typography>
                      <Typography variant="h5">
                        {getFieldData(userKycData?.documentDetail?.POIData?.nameOnCard)}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1}>
                      <Typography color="grey" variant="h5">
                        Pan No.:
                      </Typography>
                      <Typography variant="h5">
                        {getFieldData(userKycData?.documentDetail?.POIData?.IDNumber)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* <Box mt={1} display="flex" justifyContent="flex-end">
                  <Button onClick={handlePanSelfieDialog} variant="outlined">
                    <Typography variant="h5">Click here to enlarge</Typography>
                  </Button>
                </Box> */}
                <Box marginTop={2} textAlign={"center"}>
                  {userKycData && getStepStatus("PROOF_OF_IDENTITY")}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box width={isNotMobile ? "35%" : "100%"}>
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
                    <Typography variant="h5">
                      {getFieldData(userKycData?.documentDetail?.FaceMatchData?.matchPercentWithPOAImage) }
                      </Typography>
                  </Box>

                  { 
                  userKycData?.documentDetail?.FaceCaptureData?.documentImageURL && <img
                    width="40%"
                    className="small"
                    src={userKycData?.documentDetail?.FaceCaptureData?.documentImageURL}
                    alt="aadhar selfie"
                  />
                  }
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
                <Box marginTop={2} textAlign={"center"}>
                  {userKycData && getStepStatus("FACE_MATCH")}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box width={isNotMobile ? "30%" : "100%"} height={!isNotMobile ? "400px" : "300px"} border="1px solid grey">
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
            rows={logs}
            columns={adminLogsColumns}
            paginationMode="server"
            paginationModel={paginationModal}
            onPaginationModelChange={(event) => {
              setPaginationModal({ page: event.page , pageSize : event.pageSize});
            }}
            rowCount={totalRows}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      { (userKycData?.status === "IN_REVIEW") ? (
      <Box 
        display="flex" 
        justifyContent="space-between"  
        margin={"auto"} 
        width={isNotMobile ? "18%" : "80%"} >
          <Button 
            color="error"
            variant="contained"
            onClick={()=>{
              actionRef.current = "FAILED"
              setRemarkModal(true)
            }}

          >
            Reject
          </Button>
          <Button
            color="success"
            variant="contained"  
            onClick={()=>{
              actionRef.current = "VERIFIED"
              setRemarkModal(true)
            }}
          >
              Approve
          </Button>
        
      </Box>) : (userKycData?.status === "SUCCESS") ? (
        <Box 
        display="flex" 
        justifyContent="center"  
        margin={"auto"} 
        width={isNotMobile ? "18%" : "80%"} >
          <Typography
            color="success"
            variant="contained"  
          >
              Approved
          </Typography>
      </Box>
      ) : (userKycData?.status === "FAILED") ? (
        <Box 
          display="flex" 
          justifyContent="center"  
          margin={"auto"} 
          width={isNotMobile ? "18%" : "80%"} >
          <Typography 
            color="error"
            variant="contained"
          >
            Reject
          </Typography>
        
      </Box>
      ) : (<></>)
      
    }


      <RemarkModal open={remarkModal} close={() => {
                  setShowRemarksError(false);
                  setRemarkModal(false)
                }}>
        <Box sx={{...style, textAlign: "center"}}>
          <Box display="flex" justifyContent="center" marginBottom={3}>
            <Typography variant="h2">Are you sure ?</Typography>
          </Box>
          <TextField
            label="Add a remark"
            inputRef = {userRemark}
            // onChange={(e) => console.log(e.target.value)}
          />
          <Typography component={"p"} sx = {{display : showRemarkError ? "block" : "none"}} color="error" >Remarks Can not be empty</Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box width="40%">
              <Button 
                fullWidth 
                variant="contained" 
                color="error"
                onClick={() => {
                  setShowRemarksError(false);
                  setRemarkModal(false)
                }
                }
                >
                No
              </Button>
            </Box>
            <Box width="40%">
              <Button 
                fullWidth 
                variant="contained"
                color="success"
                onClick={() => handleUpdateKYC()}
                >
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </RemarkModal>
    </>
  );
}
