/* eslint-disable */

import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const infoModalStyles = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function InfoModal({ modal, toggleModal, message }) {
  return (
    <>
      <Modal open={modal} onClose={toggleModal}>
        <Box sx={infoModalStyles}>
          <Typography variant="h3">{message}</Typography>
        </Box>
      </Modal>
    </>
  );
}
