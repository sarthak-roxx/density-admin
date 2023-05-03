/* eslint-disable */

import { Modal } from "@mui/material";
import React from "react";

export default function RemarkModal({ open, close, children }) {
  return (
    <>
      <Modal open={open} onClose={close}>
        {children}
      </Modal>
    </>
  );
}
