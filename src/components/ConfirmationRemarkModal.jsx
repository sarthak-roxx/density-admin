import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField } from "@mui/material";
import CustomModal from "./CustomModal/CustomModal";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

const ConfirmationRemarkModal = ({ isOpen, close, primaryAction, secondaryAction, remark, setRemark, error }) => {
  return (
    <>
      <CustomModal
        isOpen={isOpen}
        close={close}
        isClose={true}
        isPrimaryAction={true}
        primaryName={"Yes"}
        primaryAction={primaryAction}
        secondaryName={"No"}
        isSecondaryAction={true}
        secondaryAction={secondaryAction}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "center" },
            gap: "20px",
            my: "10px",
            p: { xs: "0px 10px", sm: "5px 20px" },
          }}
        >
          <ErrorRoundedIcon sx={{ fontSize: "80px", color: "#ECA233" }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ marginBottom: "20px" }}>Are you sure you want to perform this action?</Typography>
            <TextField label="Enter Remark" value={remark} onChange={(e) => setRemark(e)} />
            {error?(<Typography sx={{color: "#F46151"}}>Remark field can not be empty</Typography>):""}
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

ConfirmationRemarkModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  remark: PropTypes.string,
  setRemark: PropTypes.func,
  error: PropTypes.bool,
};
export default ConfirmationRemarkModal;
