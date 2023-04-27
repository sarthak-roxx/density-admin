/* eslint-disable */

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const confirmModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({ modal, toggleModal, callback }) {
  return (
    <>
      <Modal open={modal} onClose={toggleModal}>
        <Box sx={confirmModalStyles}>
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <Typography variant="h2">Are you sure?</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box width="40%">
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={toggleModal}
              >
                No
              </Button>
            </Box>
            <Box width="40%">
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={callback}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
